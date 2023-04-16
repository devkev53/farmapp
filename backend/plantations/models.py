from django.db import models
from django.utils.translation import gettext as _
from core.models import BaseModel

from datetime import datetime, timedelta

# Create your models here.

class Plantation(BaseModel):
  """Model definition for Plantation."""

  # TODO: Define fields here
  name = models.CharField(_('Name'), max_length=256)
  description = models.TextField(_('Description'),blank=True, null=True)
  duration = models.PositiveSmallIntegerField(
    _('Durtation'), 
    help_text=_('Enter the duration of the crop in days to process the calculation of the estimated date')
    )
  function_Kc = models.FloatField(_('Crop Coefficient'), blank=True, null=True)
  used_water = models.FloatField(_('Used Water'),blank=True, null=True, editable=False)
  is_active = models.BooleanField(_('Is Active'), default=True)

  class Meta:
    """Meta definition for Plantation."""

    verbose_name = 'Plantation'
    verbose_name_plural = 'Plantations'

  def __str__(self):
    """Unicode representation of Plantation."""
    return '{}'.format(self.name)

  # def save(self):
  #   """Save method for Plantation."""
  #   pass

  # def get_absolute_url(self):
  #   """Return absolute url for Plantation."""
  #   return ('')

  # TODO: Define custom methods here

  def calculate_all_used_water(self):
    all_used_water = 0
    grounds = Ground.objects.filter(plantation = self.id)
    for ground in grounds:
      all_used_water += ground.used_water
    return all_used_water
  
  def estimated_date_harvest(self):
    date = self.created + timedelta(self.duration)
    return date

  

class Ground(BaseModel):
  """Model definition for Ground."""

  # TODO: Define fields here
  plantation = models.ForeignKey(Plantation, on_delete=models.CASCADE, related_name=_('associated_ground'))
  area = models.FloatField(_('area'), blank=True, null=True, default=0)
  perimeter = models.FloatField(_('perimeter'), blank=True, null=True, default=0)
  ability = models.FloatField(_('ability'), blank=True, null=True, default=0)
  wilting_point = models.FloatField(_('wilting_point'), blank=True, null=True, default=0)
  used_water = models.FloatField(_('Used Water'),blank=True, null=True, editable=False)
  thscm = models.CharField('THSCM', max_length=256, help_text=_('Identifer Number Temperature and humidity sensor control module'), blank=True, null=True)
  


  class Meta:
    """Meta definition for Ground."""

    verbose_name = 'Ground'
    verbose_name_plural = 'Grounds'

  def __str__(self):
    """Unicode representation of Ground."""
    return '{}'.format(self.plantation)

  # def save(self):
  #   """Save method for Ground."""
  #   pass

  # def get_absolute_url(self):
  #   """Return absolute url for Ground."""
  #   return ('')

  # TODO: Define custom methods here


class Irrigation(BaseModel):
  """Model definition for Irrigation."""

  # TODO: Define fields here
  ground = models.ForeignKey(Ground, on_delete=models.CASCADE, related_name=_('irrigation'))
  description = models.TextField(_('Description'),blank=True, null=True)
  start_time = models.TimeField(_('Start Time'))
  end_time = models.TimeField(_('End Time'))

  class Meta:
    """Meta definition for Irrigation."""

    verbose_name = 'Irrigation'
    verbose_name_plural = 'Irrigations'

  def __str__(self):
    """Unicode representation of Irrigation."""
    return '{}'.format(self.ground)

  # def save(self):
  #   """Save method for Irrigation."""
  #   pass

  # def get_absolute_url(self):
  #   """Return absolute url for Irrigation."""
  #   return ('')

  # TODO: Define custom methods here



class State_Ground(models.Model):
  """Model definition for State_Ground."""

  # TODO: Define fields here
  ground = models.ForeignKey(Ground, on_delete=models.CASCADE, related_name=_('ground_state'))
  air_humedity = models.FloatField(_('Air Humedity'))
  temperature_c = models.FloatField(_('Temperature celcius'))
  temperature_f = models.FloatField(_('Temperature Fahrenheit'))
  ground_humedity = models.FloatField(_('ground Humedity'))


  class Meta:
    """Meta definition for State_Ground."""

    verbose_name = 'State_Ground'
    verbose_name_plural = 'State_Grounds'

  def __str__(self):
    """Unicode representation of State_Ground."""
    return '{}'.format(self.ground)


  # def save(self):
  #   """Save method for State_Ground."""
  #   pass

  # def get_absolute_url(self):
  #   """Return absolute url for State_Ground."""
  #   return ('')

  # TODO: Define custom methods here


