from django.contrib import admin
from plantations.models import Plantation, Irrigation

# Register your models here.


@admin.register(Plantation)
class PlantationAdmin(admin.ModelAdmin):
  '''Admin View for Plantation'''

  fieldsets = [
    (
      "Información del Cultivo",
      {
        "fields": ["name", "description", "duration", "function_Kc",]
      },
    ),
    (
      "Información del Hardware",
      {
        "fields": ["thscm",]
      },
    ),
    (
      "Información de la Tierra",
      {
        "classes": ["collapse",],
        "fields": ["area", "perimeter", "ability", "wilting_point",]
      },
    ),

  ]
  list_display = ('id', 'name', 'created', 'estimated_date_harvest', 'is_active')
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # # ]
  # raw_id_fields = ('',)
  readonly_fields = ('created_by','updated_by',)
  search_fields = ('name',)
  # date_hierarchy = ''
  # ordering = ('',)

# @admin.register(Ground)
# class GroundAdmin(admin.ModelAdmin):
#   '''Admin View for Ground'''

#   list_display = ('id', 'plantation',)
#   # list_filter = ('',)
#   # inlines = [
#   #   Inline,
#   # # ]
#   # raw_id_fields = ('',)
#   readonly_fields = ('created_by','updated_by',)
#   search_fields = ('name',)
#   # date_hierarchy = ''
#   # ordering = ('',)

@admin.register(Irrigation)
class IrrigationAdmin(admin.ModelAdmin):
  '''Admin View for Irrigation'''

  list_display = ('id', 'plantation', 'description', 'start_time', 'end_time', 'is_active',)
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # # ]
  # raw_id_fields = ('',)
  readonly_fields = ('created_by','updated_by',)
  search_fields = ('name',)
  # date_hierarchy = ''
  # ordering = ('',)