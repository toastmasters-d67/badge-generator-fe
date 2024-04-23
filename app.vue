<template>
  <UCard>
    <template #header>
      識別證產生器
    </template>
    <UContainer class="flex">
      <UInput type="file" v-model="value" />
      <UButton @click="click">產生識別證</UButton>
      <div v-if="isLoading">處理中...</div>
    </UContainer>
  </UCard>
</template>

<script setup lang="ts">
const value = ref<File | null>(null); // 使用 File 類型，適合文件處理
const isLoading = ref(false);

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await useFetch(`${process.env.API_UPLOAD_URL}`, {
    method: 'POST',
    body: formData
  });
};

const downloadPDF = async () => {
  return await useFetch(`${process.env.API_DOWNLOAD_URL}`, {
    method: 'GET',
    responseType: 'blob' // 確保響應類型為 Blob，適用於文件下載
  });
};

const handleDownload = (data: Blob) => {
  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'badge.pdf'; // 設置預設下載文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // 釋放 URL 物件
};

const showAlert = (message: string) => {
  alert(message);
};

const click = async () => {
  if (!value.value) {
    showAlert('請選擇一個文件');
    return;
  }
  isLoading.value = true;

  const { data: uploadData, error: uploadError } = await uploadFile(value.value);
  if (uploadError.value) {
    showAlert('檔案上傳失敗');
    isLoading.value = false;
    return;
  }

  const { data: pdfData, error: pdfError } = await downloadPDF();
  isLoading.value = false;
  if (pdfError.value) {
    showAlert('PDF 下載失敗');
  } else {
    handleDownload(pdfData.value);
    showAlert('PDF 下載成功！');
  }
};

watchEffect(() => {
  if (isLoading.value) {
    console.log('處理中，請稍候...');
    // 在這裡添加一個視覺進度指示器，比如進度條或旋轉圖標
  } else {
    console.log('處理完成');
    // 移除進度指示器
  }
});
</script>
