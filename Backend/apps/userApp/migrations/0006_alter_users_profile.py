# Generated by Django 4.2.6 on 2024-02-21 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userApp', '0005_alter_users_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='profile',
            field=models.TextField(blank=True, null=True),
        ),
    ]