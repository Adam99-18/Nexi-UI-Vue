<template>
  <div class="test-container">
    <h1>Nexi-UI V1.1 Component Test</h1>

    <section class="test-section">
      <h2>1. NexiButton</h2>
      <nexi-button type="primary" @click="handleClick">Primary</nexi-button>
      <nexi-button type="default">Default</nexi-button>
      <nexi-button type="dashed">Dashed</nexi-button>
      <nexi-button type="text">Text</nexi-button>
      <nexi-button type="link">Link</nexi-button>
    </section>

    <section class="test-section">
      <h2>2. NexiInput</h2>
      <nexi-input v-model:value="inputValue" placeholder="Enter text" />
      <p>Value: {{ inputValue }}</p>
    </section>

    <section class="test-section">
      <h2>3. NexiIcon</h2>
      <nexi-icon icon="search" :size="24" />
      <nexi-icon icon="edit" :size="24" />
      <nexi-icon icon="delete" :size="24" />
      <nexi-icon icon="setting" :size="24" />
      <nexi-icon icon="user" :size="24" />
      <nexi-icon icon="plus" :size="24" />
      <nexi-icon icon="refresh" :size="24" />
      <nexi-icon icon="check" :size="24" />
    </section>

    <section class="test-section">
      <h2>4. NexiSwitch</h2>
      <nexi-switch v-model:checked="switchValue" />
      <p>Checked: {{ switchValue }}</p>
    </section>

    <section class="test-section">
      <h2>5. NexiTextArea</h2>
      <nexi-text-area :form="textAreaForm" field="content" placeholder="Enter text" />
      <p>Value: {{ textAreaForm.content }}</p>
    </section>

    <section class="test-section">
      <h2>6. NexiTabs</h2>
      <nexi-tabs v-model:value="activeTab" :list="tabs" />
      <p>Active: {{ activeTab }}</p>
    </section>

    <section class="test-section">
      <h2>7. NexiNull</h2>
      <nexi-null text="No data available" />
    </section>

    <section class="test-section">
      <h2>8. NexiLoading</h2>
      <nexi-loading :loading="true" text="Loading..." />
    </section>

    <section class="test-section">
      <h2>9. NexiHtml</h2>
      <nexi-html :html="'<strong>Bold</strong> and <em>italic</em>'" />
    </section>

    <section class="test-section">
      <h2>10. NexiView</h2>
      <nexi-view :is-show="true">
        <p>Custom slot content inside NexiView</p>
      </nexi-view>
      <nexi-view text="Simple text display" />
      <nexi-view :is-show="false" text="Should be hidden" />
    </section>

    <section class="test-section">
      <h2>11. NexiTextHighlight</h2>
      <nexi-text-highlight text="This is a searchable text with keywords" keyword="search" />
    </section>

    <section class="test-section">
      <h2>12. NexiImg</h2>
      <nexi-img src="https://via.placeholder.com/150" :size="150" />
    </section>

    <section class="test-section">
      <h2>13. NexiModalTip</h2>
      <nexi-button type="primary" @click="showTip = true">Open Tip Modal</nexi-button>
      <nexi-modal-tip
        v-model:visible="showTip"
        title="Test Tip"
        content="This is a test tip message"
        @ok="handleOk"
        @cancel="handleCancel"
      />
    </section>

    <section class="test-section">
      <h2>14. NexiModal</h2>
      <nexi-button type="primary" @click="modalRef.open()">Open Modal</nexi-button>
      <nexi-modal ref="modalRef" title="Test Modal" @ok="handleOk" @cancel="handleCancel">
        <p>This is modal body content</p>
      </nexi-modal>
    </section>

    <section class="test-section">
      <h2>15. NexiModalForm</h2>
      <nexi-button type="primary" @click="modalFormRef.open()">Open Form Modal</nexi-button>
      <nexi-modal-form
        ref="modalFormRef"
        title="Edit Item"
        :value="modalFormData"
        :columns="modalFormColumns"
        @ok="handleModalFormOk"
        @cancel="handleCancel"
      />
    </section>

    <section class="test-section">
      <h2>16. NexiDropDown</h2>
      <nexi-drop-down :options="dropdownOptions">
        <nexi-button>Dropdown Menu</nexi-button>
      </nexi-drop-down>
    </section>

    <section class="test-section">
      <h2>17. NexiSearchForm</h2>
      <nexi-search-form
        :columns="searchColumns"
        search-text="Search"
        reset-text="Reset"
        @search="handleSearch"
        @reset="handleReset"
      />
    </section>

    <section class="test-section">
      <h2>18. NexiForm</h2>
      <nexi-form ref="formRef" :value="formValue" :columns="formColumns" @search="handleFormSearch" />
      <nexi-button type="primary" @click="formRef.validate().then(handleFormSearch)" style="margin-top:10px">Validate Form</nexi-button>
      <nexi-button @click="formRef.reset()" style="margin-top:10px">Reset Form</nexi-button>
    </section>

    <section class="test-section">
      <h2>19. NexiAction</h2>
      <nexi-action :actions="actionItems" :column-params="{ id: 1 }" />
    </section>

    <section class="test-section">
      <h2>20. NexiTable</h2>
      <nexi-table
        :columns="tableColumns"
        :data-source="tableData"
        :pagination="false"
        :show-tool-bars="false"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'status'">
            <nexi-switch v-model:checked="record.status" />
          </template>
        </template>
      </nexi-table>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const inputValue = ref('')
const switchValue = ref(false)
const textAreaForm = reactive({ content: '' })
const activeTab = ref('tab1')
const showTip = ref(false)
const modalRef = ref()
const modalFormRef = ref()
const formRef = ref()

const tabs = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' }
]

const dropdownOptions = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' }
]

const searchColumns = [
  { field: 'name', label: 'Name', component: 'NexiInput', componentProps: { placeholder: 'Enter name' } },
  { field: 'status', label: 'Status', component: 'NexiSelect',
    componentProps: { options: [{ value: '1', label: 'Active' }, { value: '0', label: 'Inactive' }] } }
]

const modalFormData = reactive({ name: '', desc: '' })
const modalFormColumns = [
  { field: 'name', label: 'Name', component: 'NexiInput', componentProps: { placeholder: 'Enter name' } },
  { field: 'desc', label: 'Description', component: 'NexiTextArea', componentProps: { placeholder: 'Enter description' } }
]

const formValue = reactive({ username: '', email: '', role: '' })
const formColumns = [
  { field: 'username', label: 'Username', component: 'NexiInput', componentProps: { placeholder: 'Username' }, colProps: { span: 24 } },
  { field: 'email', label: 'Email', component: 'NexiInput', componentProps: { placeholder: 'Email' }, colProps: { span: 24 } },
  { field: 'role', label: 'Role', component: 'NexiSelect',
    componentProps: { options: [{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }] }, colProps: { span: 24 } }
]

const actionItems = [
  { key: 'view', label: 'View', onClick: () => console.log('View clicked') },
  { key: 'edit', label: 'Edit', onClick: () => console.log('Edit clicked') },
  { key: 'delete', label: 'Delete', onClick: () => console.log('Delete clicked'), popConfirm: { title: 'Are you sure?' } }
]

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Status', dataIndex: 'status', key: 'status' }
]
const tableData = reactive([
  { id: 1, name: 'Alice', age: 28, status: true },
  { id: 2, name: 'Bob', age: 32, status: false },
  { id: 3, name: 'Charlie', age: 25, status: true }
])

const handleClick = () => console.log('Button clicked!')
const handleOk = (params) => console.log('OK:', params)
const handleCancel = () => console.log('Cancelled')
const handleSearch = (values) => console.log('Search:', values)
const handleReset = (values) => console.log('Reset:', values)
const handleFormSearch = (values) => console.log('Form submit:', values)
const handleModalFormOk = (values) => console.log('ModalForm OK:', values)
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 20px;
  background: #f5f5f5;
}
.test-container { max-width: 1200px; margin: 0 auto; }
h1 { color: #1890ff; border-bottom: 2px solid #1890ff; padding-bottom: 10px; }
.test-section {
  background: #fff; border-radius: 8px; padding: 20px; margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.test-section h2 { margin-top: 0; color: #333; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
</style>
