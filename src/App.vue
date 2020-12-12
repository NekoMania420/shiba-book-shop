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
            <SummaryFinalItem label="Total">
              {{ toCurrency(total) }}
            </SummaryFinalItem>
            <SummaryFinalItem label="Discount">
              {{ toCurrency(discount) }}
            </SummaryFinalItem>
            <SummaryFinalItem label="Grand Total">
              <span :class="['font-bold', 'text-lg']">
                {{ toCurrency(totalWithDiscount) }}
              </span>
            </SummaryFinalItem>
            <SummaryFinalItem label="Received Cash">
              <input
                v-model.number="receivedCash"
                type="number"
                placeholder="Amount"
                min="0"
                :class="[
                  'block',
                  'text-2xl',
                  'text-right',
                  'w-40',
                  'font-bold',
                  'border-b',
                  'border-black',
                  'rounded-none',
                ]"
                @focus="handleReceivedCashInputFocus"
                @blur="handleReceivedCashInputBlur"
              />
            </SummaryFinalItem>
          </SummaryFinalList>
          <SummaryCheckoutButton
            :disabled="!selectedItems.length"
            @click="handleCheckoutButtonClick"
          />
        </template>
      </SummaryContainer>
    </template>
  </MainLayout>
  <Dialog :visible="visibleResultDialog" width="30rem">
    <div
      :class="['grid', 'gap-2', 'items-center']"
      :style="{ gridTemplateColumns: 'auto 1fr' }"
    >
      <div>Total</div>
      <div :class="['text-right']">
        {{ toCurrency(totalWithDiscount) }}
      </div>
      <div>Received Cash</div>
      <div :class="['text-right']">
        {{ toCurrency(receivedCash) }}
      </div>
      <div>Change</div>
      <div :class="['text-2xl', 'text-right', 'font-bold']">
        {{ toCurrency(change) }}
      </div>
    </div>
    <template #action>
      <button
        type="button"
        :class="['block', 'w-full', 'p-2', 'bg-green-500', 'text-white']"
        @click="handleDialogConfirmButtonClick"
      >
        OK
      </button>
    </template>
  </Dialog>
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
import { Dialog } from './components/ui'

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
    Dialog,
  },

  setup() {
    const items = ref([])

    const selectedItems = ref([])

    const receivedCash = ref(0)

    const visibleResultDialog = ref(false)

    const total = computed(() =>
      selectedItems.value.reduce(
        (prev, curr) => prev + curr.amount * curr.price,
        0
      )
    )

    const discount = computed(() => {
      const filteredItems = selectedItems.value.filter((item) =>
        /harry potter/.test(item.title.toLowerCase())
      )

      const getPercentage = (count) => {
        if (count >= 7) return 0.15
        if (count >= 6) return 0.14
        if (count >= 5) return 0.13
        if (count >= 4) return 0.12
        if (count >= 3) return 0.11
        if (count >= 2) return 0.1

        return 0
      }

      let remains = filteredItems.map((item) => ({
        value: +item.price,
        count: item.amount,
      }))

      let totalSum = 0

      while (remains.length > 1) {
        const minCount = Math.min(...remains.map((item) => item.count))

        const sum = remains.reduce((prev, curr) => prev + curr.value, 0)

        totalSum += minCount * sum * getPercentage(remains.length)

        remains = remains
          .map((item) => ({ ...item, count: item.count - minCount }))
          .filter((item) => item.count > 0)
      }

      return totalSum
    })

    const totalWithDiscount = computed(() => total.value - discount.value)

    const change = computed(() => receivedCash.value - totalWithDiscount.value)

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

    const handleCheckoutButtonClick = () => {
      visibleResultDialog.value = true
    }

    const handleReceivedCashInputFocus = (e) => {
      e.target.select()
    }

    const handleReceivedCashInputBlur = (e) => {
      if (receivedCash.value < 0) receivedCash.value = 0
    }

    const handleDialogConfirmButtonClick = () => {
      selectedItems.value = []
      visibleResultDialog.value = false
      receivedCash.value = 0
    }

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
      receivedCash,
      visibleResultDialog,
      total,
      totalWithDiscount,
      change,
      discount,
      select,
      getAmount,
      remove,
      toCurrency,
      handleCheckoutButtonClick,
      handleReceivedCashInputFocus,
      handleReceivedCashInputBlur,
      handleDialogConfirmButtonClick,
    }
  },
}
</script>
