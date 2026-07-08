from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.db import connections
from django.db.utils import OperationalError

def health_check(request):
    db_status = {}
    # Check all configured databases
    for db_name in ['default', 'customer', 'engineer']:
        try:
            db_conn = connections[db_name]
            db_conn.cursor()
            db_status[db_name] = 'Connected'
        except OperationalError:
            db_status[db_name] = 'Disconnected'
        except Exception as e:
            db_status[db_name] = f'Error: {str(e)}'
            
    return JsonResponse({
        'status': 'healthy' if all(s == 'Connected' for s in db_status.values()) else 'degraded',
        'databases': db_status
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health_check'),
    path('api/admin/', include('apps.admin_portal.user_management.api.urls')),
]
