from rest_framework import serializers

from portfolio.models import Portfolio, PortfolioItem, SpecificationCard


class PortfolioItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=PortfolioItem
        fields=['title', 'content', 'order']

class SpecificationCardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=SpecificationCard
        fields=['title', 'description']

class PortfolioSerializer(serializers.HyperlinkedModelSerializer):
    portfolio_items=PortfolioItemSerializer(many=True)
    specification_cards=SpecificationCardSerializer(many=True)

    class Meta:
        model=Portfolio
        fields=['user', 'title', 'portfolio_items', 'specification_cards']

    def create(self, validated_data):
        portfolio_items_data=validated_data.pop('portfolio_items')
        specification_cards_data=validated_data.pop('specification_cards')

        portfolio=Portfolio.objects.create(**validated_data)

        for portfolio_item_data in portfolio_items_data:
            PortfolioItem.objects.create(portfolio=portfolio, **portfolio_item_data)
        for specification_card_data in specification_cards_data:
            SpecificationCard.objects.create(Portfolio=portfolio, **specification_card_data)

        return portfolio
