<template>
  <div class="products">
    
    <div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <slot name="header" :header="header" :products="products"></slot>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <slot :product="product"></slot>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampaignListing',
  data() {
    return {
      products: [
        { id: 1, name: 'Mario', rating: 4, price: 40000 },
        { id: 2, name: 'Breath of the Wild', rating: 5, price: 60000 },
        { id: 3, name: 'Tetris 99', rating: 4, price: 8000 }
      ],
      header: {
        title1: 'Nom',
        title2: 'Note',
        title3: 'Prix',
        title4: 'identifiant'
      }
    }
  }
}
</script>
