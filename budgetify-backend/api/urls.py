from django.urls import path
from . import views

urlpatterns = [
    # Ścieżka do rejestracji (uruchamia klasę RegisterView)
    path('register/', views.RegisterView.as_view(), name='register'),
    
    # Ścieżka do logowania (uruchamia klasę LoginView)
    path('login/', views.LoginView.as_view(), name='login'),
    
    # Nasza nowa ścieżka do dashboardu (uruchamia zwykłą funkcję)
    path('dashboard-stats/', views.dashboard_stats, name='dashboard-stats'),
]