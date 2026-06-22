from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Transaction

# --- 1. REJESTRACJA ---
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        if not username or not password:
            return Response({"error": "Brakuje danych."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({"error": "Użytkownik istnieje."}, status=status.HTTP_400_BAD_REQUEST)
        User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "Konto założone!"}, status=status.HTTP_201_CREATED)

# --- 2. LOGOWANIE ---
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({"message": "Zalogowano!"}, status=status.HTTP_200_OK)
        return Response({"error": "Błędne dane."}, status=status.HTTP_401_UNAUTHORIZED)

# --- 3. DYNAMICZNY DASHBOARD Z WYKRESAMI ---
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def dashboard_stats(request):
    
    if request.method == 'POST':
        title = request.data.get('title')
        amount = request.data.get('amount')
        category = request.data.get('category')
        is_expense = request.data.get('is_expense', True)

        Transaction.objects.create(
            title=title,
            amount=amount,
            category=category,
            is_expense=is_expense
        )
        return Response({"message": "Dodano pomyślnie do bazy!"}, status=status.HTTP_201_CREATED)

    elif request.method == 'GET':
        all_tx = Transaction.objects.all()
        
        # 1. Lista transakcji dla frontu
        tx_list = []
        for t in all_tx.order_by('-id')[:5]:
            tx_list.append({
                "id": t.id,
                "title": t.title,
                "date": t.date.strftime("%d.%m.%Y") if t.date else "22.06.2026",
                "amount": f"{'-' if t.is_expense else '+'}{t.amount} zł",
                "isExpense": t.is_expense
            })
        
        # 2. Sumowanie globalne
        przychod = sum(t.amount for t in all_tx if not t.is_expense)
        wydatki = sum(t.amount for t in all_tx if t.is_expense)
        
        # 3. NOWOŚĆ: Sumowanie podziału na kategorie do wykresów
        cats = {'Spożywcze': 0.0, 'Transport': 0.0, 'Rozrywka': 0.0, 'Rachunki': 0.0, 'Inne': 0.0}
        for t in all_tx:
            if t.is_expense and t.category in cats:
                cats[t.category] += float(t.amount)

        # Startowe dane makiety zmodyfikowane o ruchy z bazy danych
        startowe_saldo = 13267.00
        aktualne_saldo = startowe_saldo + float(przychod) - float(wydatki)
        
        suma_przychodow = 3200.00 + float(przychod)
        stopa = round(((suma_przychodow - float(wydatki)) / suma_przychodow) * 100) if suma_przychodow > 0 else 0

        # Wartości makiety na start (jeśli baza jest jeszcze pusta, żeby wykresy nie były zerowe)
        if float(wydatki) == 0:
            cats = {'Spożywcze': 350.0, 'Transport': 250.0, 'Rozrywka': 200.0, 'Rachunki': 600.0, 'Inne': 210.0}
            wydatki = sum(cats.values())

        data = {
            "saldo": max(0, aktualne_saldo),
            "przychod": suma_przychodow,
            "wydatki": float(wydatki),
            "oszczednosci": max(0, int(stopa)) if float(wydatki) > 0 else 39,
            "transactions": tx_list,
            "categories": cats  # <-- WYSYŁAMY NOWE DANE KATEGORII
        }
        return Response(data)