from django.apps import AppConfig

class CustomerAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.customer.auth'
    label = 'customer_auth'
