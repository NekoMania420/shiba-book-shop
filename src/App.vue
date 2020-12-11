<template>
  <MainLayout>
    <template #navbar>
      <Navbar>
        <template #user>
          <NavbarUser
            name="Shiba Inu"
            image="https://web.pdx.edu/~strae/a341/multi-column-website/img/cute-dog-shiba-inu-ryuji-japan-44.jpg"
          />
        </template>
      </Navbar>
    </template>
    <ProductList>
      <ProductItem
        v-for="item in items"
        :key="item.id"
        :name="item.title"
        :value="+item.price"
        :image="item.cover"
        :amount="getAmount(item.id)"
        :checked="getAmount(item.id)"
        @click.prevent="select(item)"
      />
    </ProductList>
    <template #aside>
      <SummaryContainer>
        <SummaryList>
          <SummaryItem
            v-for="item in selectedItems"
            :key="item.id"
            v-model:amount="item.amount"
            :name="item.title"
            :value="+item.price"
            :image="item.cover"
            @remove="remove(item.id)"
          />
        </SummaryList>
        <template #footer>
          <SummaryFinalList>
            <SummaryFinalItem label="Discount">
              {{ toCurrency(discount) }}
            </SummaryFinalItem>
            <SummaryFinalItem label="Total">
              <span :class="['font-bold', 'text-lg']">
                {{ toCurrency(total - discount) }}
              </span>
            </SummaryFinalItem>
          </SummaryFinalList>
          <SummaryCheckoutButton />
        </template>
      </SummaryContainer>
    </template>
  </MainLayout>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { MainLayout } from './components/layout'
import { Navbar, NavbarUser } from './components/ui'
import { ProductList, ProductItem } from './components/product'
import {
  SummaryContainer,
  SummaryCheckoutButton,
  SummaryItem,
  SummaryList,
  SummaryFinalItem,
  SummaryFinalList,
} from './components/summary'

export default {
  name: 'App',

  components: {
    MainLayout,
    Navbar,
    NavbarUser,
    ProductList,
    ProductItem,
    SummaryContainer,
    SummaryCheckoutButton,
    SummaryItem,
    SummaryList,
    SummaryFinalItem,
    SummaryFinalList,
  },

  setup() {
    const items = ref([])

    const selectedItems = ref([])

    const total = computed(() =>
      selectedItems.value.reduce(
        (prev, curr) => prev + curr.amount * curr.price,
        0
      )
    )

    const discount = computed(() => {
      const count = selectedItems.value.length

      const discountPercentage = (() => {
        if (count >= 7) return 0.15
        if (count >= 6) return 0.14
        if (count >= 5) return 0.13
        if (count >= 4) return 0.12
        if (count >= 3) return 0.11
        if (count >= 2) return 0.1

        return 0
      })()

      return total.value * discountPercentage
    })

    const select = (data) => {
      const index = selectedItems.value.findIndex((item) => item.id === data.id)

      if (index !== -1) {
        selectedItems.value[index] = {
          ...selectedItems.value[index],
          amount: selectedItems.value[index].amount + 1,
        }
        return
      }

      selectedItems.value = [...selectedItems.value, { ...data, amount: 1 }]
    }

    const getAmount = (id) => {
      const data = selectedItems.value.find((item) => item.id === id)

      if (!data) return 0

      return data.amount
    }

    const remove = (id) => {
      selectedItems.value = selectedItems.value.filter((item) => item.id !== id)
    }

    const toCurrency = (value) =>
      value.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.jsonbin.io/b/5f3154b06f8e4e3faf2f99de'
        )

        const data = await response.json()

        items.value = data.books
      } catch (e) {}
    }

    fetchData()

    return {
      items,
      selectedItems,
      total,
      discount,
      select,
      getAmount,
      remove,
      toCurrency,
    }
  },
}
</script>
