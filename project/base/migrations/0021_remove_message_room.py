# Generated by Django 5.1.5 on 2025-05-07 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0020_document_title"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="message",
            name="room",
        ),
    ]
