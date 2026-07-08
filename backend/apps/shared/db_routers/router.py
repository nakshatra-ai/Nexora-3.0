class RoleDatabaseRouter:
    """
    A router to control all database operations on models in the
    application based on role isolation.
    """
    def db_for_read(self, model, **hints):
        if model._meta.app_label.startswith('customer'):
            return 'customer'
        elif model._meta.app_label.startswith('engineer'):
            return 'engineer'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label.startswith('customer'):
            return 'customer'
        elif model._meta.app_label.startswith('engineer'):
            return 'engineer'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the same database is involved.
        We generally enforce cross-database relations at the application level.
        """
        db_list = ('default', 'customer', 'engineer')
        if obj1._state.db in db_list and obj2._state.db in db_list:
            # We strictly only allow relations within the same database natively.
            if obj1._state.db == obj2._state.db:
                return True
            return False
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the specific apps only appear in the related database.
        """
        if app_label.startswith('customer'):
            return db == 'customer'
        elif app_label.startswith('engineer'):
            return db == 'engineer'
        
        # Admin, auth, contenttypes, sessions, etc go to default
        return db == 'default'
