from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from users.models import User

# Register your models here.


@admin.register(User)
class UserAdmin(BaseUserAdmin):
  '''Admin View for User'''

  list_display = ('id', 'preview_img', 'username', 'email', 'name', 'last_name', 'is_active', 'is_staff')
  fieldsets = (
    (None, {'fields': ('email', 'username', 'password')}),

    (_('Personal Info'), {'fields': ( 'name', 'last_name')}),

    (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),

    (_('Important Dates'), {'fields': ('last_login',)}),
  )
  list_display_links = ('id', 'preview_img', 'username',)
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  ordering = ('id',)