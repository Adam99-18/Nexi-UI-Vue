<template>
  <div class="test-container">
    <h1>Nexi-UI Component Test (V1.1 Fix Verification)</h1>

    <section class="test-section">
      <h2>1. NexiButton</h2>
      <nexi-button type="primary" @click="handleClick">Primary Button</nexi-button>
      <nexi-button type="default">Default Button</nexi-button>
      <nexi-button type="dashed">Dashed Button</nexi-button>
      <nexi-button type="text">Text Button</nexi-button>
      <nexi-button type="link">Link Button</nexi-button>
    </section>

    <section class="test-section">
      <h2>2. NexiInput</h2>
      <nexi-input v-model:value="inputValue" placeholder="Please enter text" />
      <p>Input value: {{ inputValue }}</p>
    </section>

    <section class="test-section">
      <h2>3. NexiIcon</h2>
      <nexi-icon icon="setting" size="24px" />
      <nexi-icon icon="edit" size="24px" />
      <nexi-icon icon="delete" size="24px" />
      <nexi-icon icon="search" size="24px" />
      <nexi-icon icon="plus" size="24px" />
      <nexi-icon icon="user" size="24px" />
    </section>

    <section class="test-section">
      <h2>4. NexiSwitch</h2>
      <nexi-switch v-model:checked="switchValue" />
      <p>Switch value: {{ switchValue }}</p>
    </section>

    <section class="test-section">
      <h2>5. NexiTextArea</h2>
      <nexi-text-area :form="textAreaForm" field="content" placeholder="Please enter text" />
      <p>TextArea value: {{ textAreaForm.content }}</p>
    </section>

    <section class="test-section">
      <h2>6. NexiTabs</h2>
      <nexi-tabs v-model:value="activeTab" :list="tabs" />
      <p>Active tab: {{ activeTab }}</p>
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
      <nexi-html :html="'<strong>Bold HTML</strong> and <em>italic</em>'" />
    </section>

    <section class="test-section">
      <h2>10. NexiImg</h2>
      <nexi-img src="https://via.placeholder.com/150" :size="150" />
    </section>

    <section class="test-section">
      <h2>11. NexiView</h2>
      <nexi-view :isShow="true">
        <p>This is visible content inside NexiView</p>
      </nexi-view>
    </section>

    <section class="test-section">
      <h2>12. NexiModalTip</h2>
      <nexi-button type="primary" @click="showTip = true">Open Tip Modal</nexi-button>
      <nexi-modal-tip
        v-model:visible="showTip"
        title="Test Tip"
        content="This is a test tip message"
      />
    </section>

    <section class="test-section">
      <h2>13. NexiDropDown</h2>
      <nexi-drop-down :options="dropdownOptions">
        <nexi-button>Dropdown</nexi-button>
      </nexi-drop-down>
    </section>

    <section class="test-section">
      <h2>14. NexiSearchForm</h2>
      <nexi-search-form :columns="searchColumns" @search="handleSearch" />
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
  {
    field: 'name',
    label: 'Name',
    component: 'NexiInput',
    componentProps: { placeholder: 'Enter name' }
  },
  {
    field: 'status',
    label: 'Status',
    component: 'NexiSelect',
    componentProps: {
      options: [
        { value: '1', label: 'Active' },
        { value: '0', label: 'Inactive' }
      ]
    }
  }
]

const handleClick = () => {
  console.log('Button clicked!')
}

const handleSearch = (values) => {
  console.log('Search values:', values)
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 20px;
  background: #f5f5f5;
}

.test-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
}

.test-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.test-section h2 {
  margin-top: 0;
  color: #333;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
</style>
