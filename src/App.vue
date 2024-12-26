<script setup>
import iconLogo from './Icons/icon-logo.vue'
import IconDollar from './Icons/icon-dollar.vue'
import iconPerson from './Icons/icon-person.vue'
import { computed, ref } from 'vue'

const selectedTip = ref(null)
const number_people = ref(null)
const custom_input = ref(null)
const billAmount = ref(null)

const tipAmountPerPerson = computed(() => {
  const tipPercentage = custom_input.value || selectedTip.value || 0
  if (!billAmount.value || !number_people.value || number_people.value <= 0) return 0
  return (billAmount.value * tipPercentage) / (100 * number_people.value)
})

const TotalPerPerson = computed(() => {
  return billAmount.value / number_people.value + tipAmountPerPerson.value
})

const ResetInput = () => {
  selectedTip.value = ''
  number_people.value = ''
  custom_input.value = ''
  billAmount.value = ''
}

const deb = (i) => {
  selectedTip.value = i
  console.log(selectedTip.value)
}
</script>

<template>
  <div class="flex md:flex-col flex-col gap-16 mt-64 md:mt-0 md:gap-16 items-center">
    <iconLogo />
    <div
      class="flex flex-col md:flex-row md:gap-14 md:w-[500px] gap-14 p-7 md:p-9 rounded-3xl bg-white"
    >
      <!-- Content here -->

      <!-- Start Input -->
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <label for="bills">Bill</label>
          <div class="flex items-center p-2 rounded space-x-[40px] px-4 gap-3 input-feild">
            <IconDollar />
            <input
              id="bills"
              v-model="billAmount"
              class="outline-none bg-transparent text-right"
              type="number"
            />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <p>Select Tip %</p>
          <div class="grid md:grid-cols-3 grid-cols-2 md:w-[300px] gap-5 md:gap-2 text-center">
            <h2
              :class="[
                'md:p-[5px] p-3 rounded cursor-pointer text-white font-bold',
                selectedTip === i ? 'bg-ver-dark-cyan' : 'bg-cyan-900',
              ]"
              v-for="(i, index) in [5, 10, 15, 25, 50]"
              @click="deb(i)"
              :key="index"
            >
              {{ i }}%
            </h2>
            <input
              class="ll md:text-center md:p-[3px] p-3 rounded text-right outline-none font-bold"
              type="number"
              value="Custom"
              @keypress="selectedTip = 0"
              v-model="custom_input"
              placeholder="Custom"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <label for="num_people">Number of People</label>
            <span
              v-show="number_people === 0"
              :class="'text-xs text-red-600' + (number_people === 0 ? '' : '')"
              >Can't be zero</span
            >
          </div>
          <div
            :class="
              'flex items-center rounded space-x-[40px] p-2 px-4 gap-3 input-feild' +
              (number_people === 0 ? ' border-red-600 border-[0.5px]' : '')
            "
          >
            <iconPerson />
            <input
              id="num_people"
              class="outline-none bg-transparent text-right"
              v-model="number_people"
              type="number"
            />
          </div>
        </div>
      </div>
      <!-- End Input -->

      <div class="flex flex-col md:gap-24 gap-10 rounded-2xl right-52 bg-cyan-900 p-5 md:p-8">
        <div class="flex flex-col gap-5">
          <div class="flex items-center gap-24">
            <div class="text-xs text-new">
              <p>Tip Amount</p>
              <span>/ person</span>
            </div>
            <h1 class="md:text-4xl text-3xl">
              ${{ tipAmountPerPerson ? tipAmountPerPerson.toFixed(2) : '0.00' }}
            </h1>
          </div>
          <div class="flex items-center gap-28">
            <div class="text-xs text-new">
              <p>Total</p>
              <span>/ person</span>
            </div>
            <h1 class="md:text-4xl text-3xl">
              ${{ TotalPerPerson ? TotalPerPerson.toFixed(2) : '0.00' }}
            </h1>
          </div>
        </div>
        <button class="ll p-2 text-sm outline-none" @click="ResetInput" type="reset">RESET</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Primary Colors */
.input-feild,
.ll {
  background-color: hsl(189, 41%, 97%); /* Very light grayish cyan */
}

.ll {
  color: hsl(186, 14%, 43%); /* Dark grayish cyan */
}

label,
p {
  font-size: small;
  color: hsl(184, 14%, 56%); /* Grayish cyan */
}

/* Input Field Styles */
.input-feild input {
  color: hsl(183, 100%, 15%); /* Very dark cyan */
}

/* Button */
button {
  background-color: hsl(172, 67%, 45%); /* Strong cyan */
  color: hsl(0, 0%, 100%); /* White */
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: hsl(186, 19%, 89%); /* Very dark cyan */
}

/* Tip Amount Display */
.text-new {
  color: hsl(186, 14%, 43%); /* Dark grayish cyan */
}

h1 {
  color: hsl(172, 67%, 45%); /* Strong cyan */
}

/* Overall Background */
.bg-cyan-900 {
  background-color: hsl(183, 100%, 15%); /* Very dark cyan */
  color: hsl(0, 0%, 100%); /* White */
}
</style>
