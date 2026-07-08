from django.apps import AppConfig

class AdminUserManagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.admin_portal.user_management'
    label = 'admin_user_management'
    verbose_name = 'Admin Portal'
