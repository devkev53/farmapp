from django.contrib import admin
from plantations.models import Plantation, Irrigation, State_Irrigation, State_Ground

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
  list_display = ('id', 'name', 'created', 'duration', 'estimated_days_for_harvest' , 'estimated_date_for_harvest', 'total_water', 'is_active')
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # # ]
  # raw_id_fields = ('',)
  readonly_fields = ('created_by','updated_by',)
  search_fields = ('name',)
  # date_hierarchy = ''
  # ordering = ('',)


@admin.register(Irrigation)
class IrrigationAdmin(admin.ModelAdmin):
  '''Admin View for Irrigation'''

  list_display = ('id', 'plantation', 'description', 'start_time', 'end_time', 'is_active', 'state_start_irrigation', 'on_irrigation' )
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # # ]
  # raw_id_fields = ('',)
  readonly_fields = ('created_by','updated_by',)
  search_fields = ('name',)
  # date_hierarchy = ''
  # ordering = ('',)


@admin.register(State_Irrigation)
class State_IrrigationAdmin(admin.ModelAdmin):
  '''Admin View for State_Irrigation'''

  list_display = ('pk', 'plantation', 'water_quantity', 'duration', 'start_time', 'time_duration', 'aproximate_end_time')
  # list_filter = ('',)
  # inlines = [
  #   Inline,
  # ]
  # raw_id_fields = ('',)
  # readonly_fields = ('',)
  # search_fields = ('',)
  # date_hierarchy = ''
  # ordering = ('',)

  @admin.register(State_Ground)
  class State_GroundAdmin(admin.ModelAdmin):
    '''Admin View for State_Ground'''
  
    list_display = (
      'pk', 'plantation', 'air_humedity',
      'temperature_c', 'temperature_f', 'ground_humedity'
    )
    # list_filter = ('',)
    # inlines = [
    #   Inline,
    # ]
    # raw_id_fields = ('',)
    # readonly_fields = ('',)
    # search_fields = ('',)
    # date_hierarchy = ''
    # ordering = ('',)