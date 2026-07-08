from .base import *
from pathlib import Path

DEBUG = True

ALLOWED_HOSTS = ['*']

# Enterprise Multi-Database Architecture Setup
# For local dev, we simulate the distributed databases using separate SQLite files.
# In production, these will map to separate PostgreSQL instances or schemas.
DATABASES = {
    'default': {
        # The default DB holds Admin data, auth schemas, and system-wide tables
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db_admin.sqlite3',
    },
    'customer': {
        # Dedicated Customer Database
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db_customer.sqlite3',
    },
    'engineer': {
        # Dedicated Engineer Database
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db_engineer.sqlite3',
    }
}
