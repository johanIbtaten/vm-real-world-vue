<template>
  <div>
    <h1>A List of Nintendo Games</h1>
    <CampaignListing>
      <template v-slot:header="{ header, products }">
        <th scope="col">{{ header.title1 }}</th>
        <th scope="col">{{ header.title2 }}</th>
        <th scope="col">{{ products[0].name }}</th>
      </template>

      <template v-slot:default="{ product }">
        <td class="product_name">{{ product.name }}</td>
        <td class="product_rating">{{ product.rating }}</td>
        <td class="product_price">{{ product.price }}</td>
      </template>
    </CampaignListing>

    <h1>Another List of Games</h1>
    <CampaignListing>
      <template v-slot:header="{ header, products }">
        <th scope="col">{{ header.title1 }}</th>
        <th scope="col">{{ header.title2 }}</th>
        <th scope="col">{{ products[1].name }}</th>
        <th scope="col">{{ header.title4 }}</th>
      </template>

      <template v-slot:default="{ product }">
        <td class="product_name">{{ product.name }}</td>
        <td class="product_rating">{{ product.rating }}</td>
        <td class="product_price">{{ product.price }}</td>
        <td class="product_id">{{ product.id }}</td>
      </template>
    </CampaignListing>
  </div>
</template>

<script>
import CampaignListing from '../components/CampaignListing'

export default {
  name: 'Slots',
  components: {
    CampaignListing
  }
}
</script>
