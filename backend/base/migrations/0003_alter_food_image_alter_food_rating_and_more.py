# Generated by Django 4.1.7 on 2023-03-29 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_delivery_order_alter_delivery_shipping_fee_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='food',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
        migrations.AlterField(
            model_name='food',
            name='rating',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='orderdetail',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
    ]