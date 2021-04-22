<template>
  <base-layout>
    <ion-fab vertical="top" horizontal="end">
      <ion-fab-button v-on:click="openModal">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-row>
      <router-link to="/">Home</router-link>
      <router-link v-if="parent" :to="{ path: '/' + parent }">
        / {{ parent }}</router-link
      >
      <ion-label> /{{ categoryId }}</ion-label>
    </ion-row>
    <ion-text color="primary ion-text-center">
      <h2>Category Page</h2>
    </ion-text>
    <ion-card v-if="currentCategory.category">
      <img :src="currentCategory.category.image" />
      <ion-card-header>
        <ion-card-subtitle>Category</ion-card-subtitle>
        <ion-card-title>{{ currentCategory.category.name }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        {{ currentCategory.category.desc }}
      </ion-card-content>
    </ion-card>
    <ion-grid>
      <ion-row>
        <ion-col
          v-for="subcategory in currentCategory.subcategories"
          :key="subcategory.id"
          :router-link="`/${subcategory.catid}`"
        >
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{{ subcategory.name }}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <img :src="subcategory.image" />
            </IonCardContent>
          </IonCard>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonFab,
  IonFabButton,
  modalController,
  IonText,
} from "@ionic/vue";

import addCategoryModal from "../components/modals/addCategoryModal";
import { mapGetters } from "vuex";
export default {
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFab,
    IonFabButton,
    IonText,
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: addCategoryModal,
        cssClass: "my-custom-class",
        componentProps: {
          parentCat: this.categoryId,
        },
      });
      return modal.present();
    },
  },
  data() {
    return {
      currentCategory: null,
      categoryId: "",
    };
  },
  computed: {
    ...mapGetters("category", { categoryById: "categoryById" }),
  },
  watch: {
    "$route.params.id": {
      handler: function (id) {
        this.currentCategory = this.categoryById(id);
        this.categoryId = id;
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    //this.currentCategory = this.categoryById(this.categoryId);
    // var storage = this.$fire_base.storage;
    // var storageRef = storage.ref();
    // this.$fire_base.db.collection("categories").onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //       var dat = change.doc.data();
    //       var catId = change.doc.id;
    //       var tangRef = storageRef.child(dat.image);
    //       tangRef.getDownloadURL().then((url) => {
    //         var newDat = {
    //           name: dat.name,
    //           desc: dat.desc,
    //           catid: catId,
    //           image: url,
    //         };
    //         this.$store.commit("add", newDat);
    //       });
    //     }
    //   });
    // });
  },
};
</script>