<template>
  <div>
    <nuxt />
  </div>
</template>

<style>

.container {
    max-width: 1400px;
    width: 1400px;
    position: relative;
}

.admin-content {
  padding-top: 120px;
  background: #f7f9fa;
  opacity: 1;
  transition: opacity .15s;
  min-height: 100vh;
}

.admin-content.show {
  opacity: 1;
}

.item {
  background: #fff;
  /* box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,.03), 0 0.9375rem 1.40625rem rgba(4,9,20,.03), 0 0.25rem 0.53125rem rgba(4,9,20,.05), 0 0.125rem 0.1875rem rgba(4,9,20,.03);
  border-radius: 5px; */
  padding: 20px;
  margin-bottom: 0px;
  border-bottom: 1px solid #d4dadc;
}

.item img{  
  width: 50px;
}

.item.header {
  background: none;
  box-shadow: none;
  padding: 10px 50px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #111;
}



.admin-content h1 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}

.admin-content h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.admin-content h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}

#admin-all-posts p {
  font-size: 15px;
}

.admin-content .btn-primary {
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  background-color: #6c757d;
  border-color: #6c757d;
}

.admin-content .btn-primary:hover, .admin-content .btn-primary:focus, .admin-content .btn-primary:active {
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  background-color: #59646f!important;
  border-color: #59646f!important;
}

.admin-content .file-uploads {
    padding: 0.1rem 0.75rem;
    cursor: pointer;
    background-color: #f3f3f3;
    border-color: #bfbfbf;
    color: #333;
}

.admin-content .file-uploads:hover, .admin-content .file-uploads:focus, .admin-content .file-uploads:active {
    padding: 0.1rem 0.75rem;
    cursor: pointer;
    background-color: #e8e8e8!important;
    border-color: #bfbfbf!important;
    color: #333;
}

.admin-content .file-remove {
   padding: 0.1rem 0.75rem;
}


.admin-content .datepicker .pick-panel {
  border-radius: 6px;
}

.admin-content .datepicker .dp-header {
  display: -webkit-box;
  display: flex;
  width: 100%;
  background: #333;
  border-radius: 6px 6px 0 0;
  margin-bottom: 10px;
}

.admin-content .datepicker .dp-footer {
  width: 100%;
  padding: 0 8px;
  border-top: 1px solid #dcdcdc;
}

.admin-content .datepicker .btn {
  padding: 15px 3px;
  cursor: pointer;
}

.admin-content .datepicker .dp-header .btn{
  color: #fff;
}


.admin-content .table thead td, .table thead th {
  border-width: 0 0 1px;
  color: #555;
}

#admin-all-posts .item p {
  margin-bottom: 5px;
}

#admin-all-posts .item a {
  color: #111;
}

.admin-content-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.admin-content-header a{
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 5px 15px;
  border: 1px solid rgb(95,154,86);
  border-radius: 4px;
  background:rgb(95,154,86);
}
</style>
