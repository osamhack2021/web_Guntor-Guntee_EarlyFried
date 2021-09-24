# Generated by Django 3.2 on 2021-09-24 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('username', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=254)),
                ('nickname', models.CharField(max_length=20)),
                ('profile_image', models.ImageField(upload_to='')),
                ('experience_point', models.PositiveIntegerField(default=0)),
                ('description', models.CharField(max_length=120)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('content', models.TextField()),
                ('mentee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_reviews', to='users.user')),
                ('mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_reviews', to='users.user')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
