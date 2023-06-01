<template>
  <div class="mt-6 mb-4">
    <WarehouseHeaderWidget>Equipment</WarehouseHeaderWidget>
    <div class="flex justify-between">
      <div>
        <SearchInput
          v-show="tableDetails.length != 0"
          v-model.trim.lazy="searchInput"
          :show-secondary-icon="true"
          class="w-[19rem] mt-4"
        />
      </div>
      <div class="flex items-end">
        <button
          class="btn btn--secondary mr-2 flex gap-2"
          :disabled="data.selected.length < 1"
          @click="actionsDropDownActive=true"
          @blur="closeActionsDropDown"
        >
          Actions             
          <img
            class="caret"
            :class="{active: actionsDropDownActive}"
            src="/images/svg/caret-down.svg"
            alt="down"
          >
        </button>
        <ul
          class="actions-dropdown dropdown w-48 bg-vvn-gray text-white text-center rounded-lg absolute z-30 mt-12"
          :class="{ active: actionsDropDownActive }"
        >
          <li
            class="py-2 w-full"
            @click="editItem"
          >
            Edit
          </li>
          <hr>
          <li
            class="py-2"
            @click="deleteConfirmationModalActive = true"
          >
            Delete
          </li>
        </ul>
        <div class="relative">
          <button
            class="btn btn--primary appearance-none"
            @click="data.dropdownActive = !data.dropdownActive"
            @blur="closeAddNewDropdown"
          >
            + Add New
          </button>
          <ul
            class="dropdown w-48 bg-vvn-gray text-white text-center rounded-lg absolute z-30 -ml-14 mt-2"
            :class="{ active: data.dropdownActive }"
          >
            <li class=" py-2">
              <a href="equipment/new">Equipment Item</a>
            </li>
            <hr>
            <hr>
            <li class=" py-2">
              <a href="equipment/csv">Upload csv</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- ================================================ -->
  <!-- ===================Empty list view==================== -->
  <!-- ================================================ -->
  <div
    v-if="tableDetails.length == 0"
    
    class="w-full h-[30rem] flex justify-center items-center"
  >
    <div>
      <img
        src="/images/svg/lost.svg"
        alt=""
      >
      <p class="text-vvn-gray-90 text-center text-lg mt-6">
        No equipment created
      </p>
    </div>
  </div>
  <!-- ================================================ -->
  <!-- ===================Inventory List==================== -->
  <!-- ================================================ -->
  <TheTable
    v-else
    :rows="['', 'Name', '']"
    :template-columns="{ 'grid-template-columns': '5% 85% 10%' }"
  >
    <TableRow_Equipment
      v-for="(p, index) in tableDetails"
      :key="index"
      :data="p"
      class=" mb-3"
      :toggle-details="true && data.toggledItem == p.id"
      :template-columns="{ 'grid-template-columns': '5% 85% 10%' }"
    >
      <template #row-data="rowData: Inventory">
        <td>
          <CheckBox
            v-model="data.selected"
            :value="(p.id as string)"
          />
        </td>
        <td class="pr-3">
          <p class="text-base relative">
            {{ rowData.name }}
          </p>
          <small class="text-xs text-vvn-gray line-clamp-1">{{ rowData.description }}</small>
        </td>
        <td class="flex justify-end">
          <button
            class=" mr-11"
            @click="(data.toggledItem = rowData.id as string)"
          >
            <img
              src="/images/svg/caret-down.svg"
              alt="down"
            >
          </button>
        </td>
      </template>
      <template #details>
        <InventoryDetailsEquipment :data="p" />
      </template>
    </TableRow_Equipment>
  </TheTable>
  <!-- ================================================ -->
  <!-- ===================Edit Form==================== -->
  <!-- ================================================ -->
  <LazyDefaultModal
    v-model="editItemsOpen"
    @close="editItemsOpen = false"
  >
    <form
      id="form"
      class="p-6"
      @submit.prevent="saveEdit"
    >
      <h1 class="text-4xl font-bold text-white">
        Edit Item
      </h1>
      <div class=" border border-vvn-white-15 p-5 rounded-[10px] bg-vvn-white-02 backdrop-blur-sm mt-4">
        <div class="flex items-start">
          <div class="w-48 mr-4">
            <label
              for="name"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Name/Number</label>
            <TextInput
              id="name"
              v-model="data.inventoryItem.name"
              name="name"
              :rules="'required|min:2'"
            />
          </div>
          <div class="w-48 mr-4">
            <label
              for="description"
              class=" text-vvn-gray text-base mb-2 inline-block"
            >Description</label>
            <TextInput
              id="description"
              v-model="data.inventoryItem.description"
              name="description"
              :rules="'required|min:2'"
            />
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-48 mr-4">
            <label
              for="portNumber"
              class=" text-vvn-gray text-base mb-2 "
            >Port Number</label>
            <TextInput
              id="portNumber"
              v-model="data.inventoryItem.portNumber"
              name="portNumber"
              :rules="'required|min:2'"
            />
          </div>
          <div class="w-48 mr-4">
            <label
              for="mfg"
              class=" text-vvn-gray text-base mb-2"
            >Manufacturer/Vendor</label>
            <TextInput
              id="mfg"
              v-model="data.inventoryItem.manufacturer"
              name="manufacturer"
              :rules="'required|min:2'"
            />
          </div>
          <div class="w-48">
            <label
              for="threshold"
              class=" text-vvn-gray text-base mb-2"
            >Inventory Threshold</label>
            <TextInput
              id="threshold"
              v-model.number="data.inventoryItem.threshold"
              name="threshold"
              :rules="'required|numeric'"
            />
          </div>
        </div>
      </div>
      <hr class=" w-full border border-vvn-white-10 my-6">
      <div class="flex justify-end items-center">
        <button class=" btn btn--primary">
          Save
        </button>
      </div>
    </form>
  </LazyDefaultModal>
  <!-- ================================================ -->
  <!-- ===================Confirmation Modal==================== -->
  <!-- ================================================ -->
  <LazyConfirmationModal
    v-model="deleteConfirmationModalActive"
    @close="deleteConfirmationModalActive = false"
  >
    <template #icon>
      <p class="text-xl text-white">
        ?
      </p>
    </template>
    <h4 class="text-xl text-white text-center mt-3">
      Are you sure you want<br> to delete selected items?
    </h4>
    <div class="flex justify-center gap-4 mt-4">
      <button
        class="btn btn--primary"
        style="background-color: transparent; border-color:white"
        @click="deleteConfirmationModalActive = !deleteConfirmationModalActive"
      >
        Close
      </button>
      <button
        class="btn btn--primary"
        @click="deleteItems"
      >
        Delete
      </button>
    </div>
  </LazyConfirmationModal>
</template>

<script setup lang="ts">
import { Inventory } from "~/types"

interface State {
  dropdownActive: boolean
  selected: string[]
  toggledItem: string
  inventoryItem: Inventory
}
const data = reactive<State>({
  dropdownActive: false,
  selected: [],
  toggledItem: "",
  inventoryItem: {
    id: "",
    name: "",
    description: "",
    totalInventory: 0,
    manufacturer: "",
  },
})

const store = useInventoryStore()
const editItemsOpen = ref(false)
const searchInput = useDebouncedRef("", 200)
const deleteConfirmationModalActive = ref(false)
const actionsDropDownActive = ref(false)

const tableDetails = computed(() => {
  //return searchInput.value == "" ? store.inventoryList : store.inventorySearch
  return store.equipmentList
})

watch(searchInput, async (current) => {
  store.searchInventoryItem(current, { page: 0, size: 5 })
})

await useAsyncData('', () => store.getEquipmentItems({}))

const editItem = () => {
  /*const selectedItem = store.inventoryList.find(i => i.id == data.selected[0]) as Inventory
  data.inventoryItem.id = selectedItem.id
  data.inventoryItem.name = selectedItem.name
  data.inventoryItem.description = selectedItem.description
  data.inventoryItem.quantity = selectedItem.quantity
  data.inventoryItem.threshold = selectedItem.threshold
  editItemsOpen.value = true*/
}

const deleteItems = () => {
  store.deleteEquipment(data.selected)
    .then(() => {
      store.getEquipmentItems({})
      data.selected = []
      deleteConfirmationModalActive.value = false
      useToast().success('Equipment Deleted')
    })
}

const saveEdit = async () => {
  /*store.editInventoryItem(data.inventoryItem).then(() => {    
    store.getInventoryItems({})
    editItemsOpen.value = false
    useToast().success('Item updated')
  }).catch(() => {
    useToast().error('Update failed')
  })*/
}

const closeActionsDropDown = () => setTimeout((() => actionsDropDownActive.value=false), 100)
const closeAddNewDropdown = () => setTimeout(() => data.dropdownActive = false, 100)
</script>
<style lang="scss" scoped>
.dropdown {
  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-out;

  &.actions-dropdown.active {
    height: 80px;
  }
  &.active {
    height: 124px;
  }
}

.caret {
  transition: transform 0.2s ease-in;
  &.active {
    transform: rotate(-180deg)
  }
}
</style>
