import { createApp } from 'vue'
import App from './App.vue'

var app = createApp(App);
// Import các thành phần tái sử dụng được
import MISAButton from '@/components/base/MISAButton.vue';
import MISALoading from '@/components/base/MISALoading.vue';
import MISADialog from '@/components/base/MISADialog.vue';
import MISATooltip from '@/components/base/MISATooltip.vue';
import MISAIconTooltip from '@/components/base/MISAIconTooltip.vue';
import MISATextTooltip from '@/components/base/MISATextTooltip.vue';
import MISAToast from '@/components/base/MISAToast.vue';
import MISAInput from '@/components/base/MISAInput.vue';
import MISACombobox from '@/components/base/MISACombobox.vue';
import MISADropdown from '@/components/base/MISADropdown.vue';
import MISATextarea from '@/components/base/MISATextarea.vue';

// Import directives
import CLICK_OUTSIDE from './directives/click-outside';

// Khai báo sử dụng các component
app.component("MISAButton", MISAButton);
app.component("MISALoading", MISALoading);
app.component("MISADialog", MISADialog);
app.component("MISATooltip", MISATooltip);
app.component("MISAIconTooltip", MISAIconTooltip);
app.component("MISATextTooltip", MISATextTooltip);
app.component("MISAToast", MISAToast);
app.component("MISAInput", MISAInput);
app.component("MISACombobox", MISACombobox);
app.component("MISADropdown", MISADropdown);
app.component("MISATextarea", MISATextarea);

// Đăng ký directive click outside
app.directive("click-outside", CLICK_OUTSIDE);

app.mount('#app')
