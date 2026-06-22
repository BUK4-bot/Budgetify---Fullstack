from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from api.views import RegisterView

# Importy dla dokumentacji API (Swagger)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Konfiguracja wyglądu naszej dokumentacji
schema_view = get_schema_view(
    openapi.Info(
        title="Budgetify API",
        default_version='v1',
        description="Dokumentacja API dla aplikacji Budgetify",
        contact=openapi.Contact(email="kontakt@budgetify.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')), 
    path('api/login/', obtain_auth_token, name='api_token_auth'),
    path('api/register/', RegisterView.as_view(), name='register'),
    
    # Adresy do interaktywnej dokumentacji
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]