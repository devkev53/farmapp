from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from users.models import User
# from core.tasks import send_emails_users

# Register your models here.


@admin.register(User)
class UserAdmin(BaseUserAdmin):
  '''Admin View for User'''

  list_display = ('id', 'preview_img', 'username', 'email', 'name', 'last_name', 'is_active', 'is_staff',  'url_img',)
  fieldsets = (
    (None, {'fields': ('email', 'username', 'password')}),

    (_('Personal Info'), {'fields': ( 'name', 'last_name')}),

    (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),

    (_('Profile Info'), {'fields': ('phone','address', 'birthday', 'image')}),

    (_('Important Dates'), {'fields': ('last_login',)}),
  )
  list_display_links = ('id', 'preview_img', 'username',)
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  search_fields = ('username','name', 'last_name', 'email')
  # date_hierarchy = ''
  ordering = ('id',)
  actions = ['send_emails_actions',]
  list_per_page = 9

  def send_emails_actions(self, request, queryset, *args, **kwargs):
    # send_emails_users.delay()
    updated_rows = queryset
    print(updated_rows)

    return True