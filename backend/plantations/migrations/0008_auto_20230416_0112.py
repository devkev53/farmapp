# Generated by Django 3.2 on 2023-04-16 01:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plantations', '0007_auto_20230416_0110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalplantation',
            name='duration',
            field=models.PositiveSmallIntegerField(verbose_name='Durtation'),
        ),
        migrations.AlterField(
            model_name='plantation',
            name='duration',
            field=models.PositiveSmallIntegerField(verbose_name='Durtation'),
        ),
    ]
