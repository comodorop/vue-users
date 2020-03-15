<template>
<v-app>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Users
        </v-card-title>
        <v-col>
          <v-alert v-if="messageShow" type="warning">
      {{message}}
    </v-alert>
          <form>
          <v-text-field
          v-model="obj.first_name"
          :counter="10"
          label="First name"
        ></v-text-field>
        <v-text-field
          v-model="obj.last_name"
          :counter="10"
          label="Last name"
        ></v-text-field>
        <v-text-field
          v-model="obj.email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="obj.city"
          :counter="10"
          label="City"
          
        ></v-text-field>
        
          </form>
      
  </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="save"
          >
            Guardar
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  <v-container>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        Pablo Torres
      </div>
    </v-app-bar>

    <v-content>
       <v-row >
      <v-col cols="4">
        <v-text-field
            v-model="search"
            label="Search ..."
            outlined
          ></v-text-field>
         <span> {{count}} Registros encontrados</span>
      </v-col>
      <v-col cols="2">
        <v-btn x-large @click="getData" color="primary" >Buscar</v-btn>
      </v-col>
      <v-col cols="4">

      </v-col>
      <v-col cols="2">
        <v-btn x-large @click="openModal" color="success" >Nuevo</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      <v-simple-table dense >
      <template v-slot:default>
        <thead>
          <tr>
            <th>#</th>
            <th class="text-left">Name</th>
            <th class="text-left">Last name</th>
            <th class="text-left">Email</th>
            <th class="text-left">City</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in desserts" :key="index">
            <td>{{index +1 }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.city }}</td>
          </tr>
        </tbody>
      </template>
  </v-simple-table>
      </v-col>
    </v-row>
      
    </v-content>
    </v-container>
  </v-app>


</template>

<script>

import http from './services/http'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    search: '',
    desserts: [],
    dialog: false,
    count: 0,
    obj : {
      first_name: '',
      last_name: '',
      email: '',
      city: ''
    },
    message: '',
    messageShow: false
  }),
  methods: {
    async getData (){
      try {
        let data = await http.get(`v1/users?search=${this.search}`) 
        this.desserts = data.data.data
        this.count = data.data.count
      } catch (error) {
        console.log(error)
      }
      
    },
    openModal(){
      this.dialog = true
    },
    async save(){
      try {
        let data = await http.post('v1/users', this.obj)  
        this.dialog = false
        this.obj.first_name = ''
        this.obj.last_name = ''
        this.obj.email  = ''
        this.obj.city = ''
      } catch (error) {
        this.messageShow = true
        this.message = error.response.data.msg
        setTimeout(() => {
          this.messageShow = false
        }, 1500);
      }finally {
        
      }
    }
  }
};
</script>


<style lang="stylus" scoped>


</style>
