from django.apps import AppConfig

class CustomerProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.customer.profile'
    label = 'customer_profile'
