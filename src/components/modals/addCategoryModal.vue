<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Add Category</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form
      id="categoryForm"
      class="ion-padding"
      @submit.prevent="addNewCategory"
    >
      <ion-list>
        <ion-item>
          <ion-label position="floating">Parent Category</ion-label>
          <ion-input type="text" disabled v-model="parent" />
        </ion-item>
        <ion-item>
          <ion-label position="floating">Category Name</ion-label>
          <ion-input type="text" required v-model="categoryName" />
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea rows="3" required v-model="categoryDesc"></ion-textarea>
        </ion-item>
        <ion-item v-if="imageUrl" class="ion-padding">
          <ion-img :src="imageUrl"></ion-img>
        </ion-item>
        <ion-item>
          <ion-label
            class="ion-padding"
            v-if="uploadStatus"
            :color="`${error ? 'danger' : 'success'}`"
            >{{ uploadStatus }}</ion-label
          >
        </ion-item>
        <ion-item>
          <input
            style="display: none"
            accept="image/*"
            ref="fileInput"
            type="file"
            @change="onFileSelected"
          />
          <ion-button @click="$refs.fileInput.click()" color="tertiary"
            ><ion-icon name="cloud-upload-outline"></ion-icon
            ><span class="ion-padding">Select Image</span></ion-button
          >

          <ion-button @click="uploadImage" color="success"
            ><ion-icon name="checkmark-circle-outline"></ion-icon>
            <span class="ion-padding">Upload</span></ion-button
          >
        </ion-item>
        <ion-item>
          <ion-progress-bar
            value="0"
            id="progress"
            color="primary"
          ></ion-progress-bar>
        </ion-item>
        <ion-button
          class="ion-hide"
          id="addButton"
          type="submit"
          shape="round"
          expand="block"
          color="primary"
          >Add</ion-button
        >
        <ion-button
          @click="closeModal"
          type="reset"
          shape="round"
          expand="block"
          color="danger"
          >Cancel</ion-button
        >
      </ion-list>
    </form>
  </ion-content>
  <ion-footer> </ion-footer>
</template>

<script>
import { mapActions } from "vuex";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonProgressBar,
  modalController,
  IonImg,
} from "@ionic/vue";

export default {
  name: "addCategoryModal",
  props: {
    parentCat: { type: String, default: "" },
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonProgressBar,
    IonImg,
  },
  data() {
    return {
      categoryName: "",
      categoryDesc: "",
      image: "",
      parent: this.parentCat,
      imageUrl: null,
      selectedFile: null,
      uploadStatus: "",
      error: false,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    ...mapActions("category", {
      addCategory: "addCategory",
    }),
    onFileSelected(event) {
      this.uploadStatus = "";
      this.error = false;
      if (event.target.files != null && event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        this.imageUrl = URL.createObjectURL(event.target.files[0]);
      }
    },
    uploadImage() {
      var storage = this.$fire_base.storage;
      var storageRef = storage.ref();
      var imagesRef = storageRef.child("images/" + this.selectedFile.name);
      this.image = "images/" + this.selectedFile.name;
      var uploadTask = imagesRef.put(this.selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var element = document.getElementById("progress");
          var progress = snapshot.bytesTransferred / snapshot.totalBytes; // * 100;
          element.value = progress;
          switch (snapshot.state) {
            case this.$fire_base.storageVar.TaskState.PAUSED: // or 'paused'
              break;
            case this.$fire_base.storageVar.TaskState.RUNNING: // or 'running'
              break;
          }
        },
        (error) => {
          this.uploadStatus = "Upload failed";
          this.error = true;
          console.log(error);
        },
        () => {
          this.uploadStatus = "Uploaded Successfully";
          var addButton = document.getElementById("addButton");
          addButton.classList.toggle("ion-hide");
        }
      );
    },
    addNewCategory() {
      const newDat = {
        name: this.categoryName,
        desc: this.categoryDesc,
        image: this.image,
        parent: this.parent,
        created: this.$fire_base.dbVar.FieldValue.serverTimestamp(),
      };
      this.$fire_base.db
        .collection("categories")
        .add(newDat)
        .then((docRef) => {
          var newDat = {
            name: docRef.name,
            desc: docRef.desc,
            catid: docRef.id,
            image: docRef.image,
            parent: docRef.parent,
          };
          this.addCategory(newDat);
          this.showToast("Category Added with Ref : " + docRef.id);
          this.closeModal();
        });
    },
    async showToast(message) {
      const toast = document.createElement("ion-toast");
      toast.message = message;
      toast.duration = 2000;
      document.body.appendChild(toast);
      return toast.present();
    },
  },
};
</script>
