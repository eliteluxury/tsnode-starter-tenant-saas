<template>
<page>

  <page-header
    :title="'Add Unit to ' + building.street"
    :breadcrumbs="pageHeader.breadcrumbs"
  >
    <template slot="action-right">
      <willow-button  class="float-right mt-3" size="lg" primary @click.native="createUnit()">Save</willow-button>
    </template>
  </page-header>

  <willow-layout>

    <!-- Primary -->
    <willow-layout-section >

      <b-card  card-title="Secondary" class="mb-2">
        <b-row>
          <b-col>
            <!-- <willow-button v-b-modal.modallg  plain size="sm" class="close sm" style="font-size: 0.75rem;">Edit</willow-button> -->
          </b-col>
        </b-row>
          <b-row class="mb-3">
            <b-col xs="24" sm="8" md="6" lg="4">
              <willow-textfield
                :value="unitForm.unitNumber"
                :label="'Unit Number'"
                v-model="unitForm.unitNumber"
                heading
              ></willow-textfield>
            </b-col>
          </b-row>

          <b-row class="mb-3">
            <b-col xs="24" sm="8" md="6" lg="4">
              <willow-select
                :value="unitForm.bedrooms"
                :options="[{value: '0', text: 'Studio'},{value: '1', text: '1'},{value: '2', text: '2'},{value: '3', text: '3'},{value: '4', text: '4'},{value: '5', text: '5+'}]"
                :label="'Beds'"
                v-model="unitForm.bedrooms"
                heading
              ></willow-select>
            </b-col>

            <b-col xs="24" sm="8" md="6" lg="4">
              <willow-select
                :value="unitForm.baths"
                :options="[{value: '1', text: '1'},{value: '1.5', text: '1.5'},{value: '2', text: '2'},{value: '2.5', text: '2.5'},{value: '3', text: '3'},{value: '3.5', text: '3.5'},{value: '4', text: '4+'}]"
                :label="'Baths'"
                v-model="unitForm.baths"
                heading
              ></willow-select>
            </b-col>
            <b-col xs="24" sm="8" md="6" lg="4">
              <willow-textfield
                :value="unitForm.marketRent"
                :label="'Market Rent'"
                v-model="unitForm.marketRent"
                heading
              ></willow-textfield>
            </b-col>
            <!-- <b-col>
              <willow-select
                :value="unitForm.marketRent"
                :options="this.$store.getters.getPropertyTypes"
                :label="'Market Rent'"
                v-model="unitForm.marketRent"
                heading
              ></willow-select>
            </b-col> -->
            <b-col>
            </b-col>
          </b-row>
       </b-card>

       <b-card class="mb-2" >
        <h6 class="heading">Features</h6>
        <b-row class="mb-2">
          <b-col>
            <b-form-group>
              <b-form-checkbox-group
                id="unit_features"
                name="unit_features"
                v-model="unitForm.unitFeatures"
                :options="this.$store.getters.getUnitFeatures">
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>

       </b-card>

    </willow-layout-section>

        <!-- Secondary -->
    <willow-layout-section secondary>

      <!-- <b-card  card-title="Secondary- Subdued" class="mb-2" style="background-color: #f8f9fa ;">
        <b-form-group>
          <willow-select

            :value="'on'"
            :options="[{ value: true, text: 'Active' },{ value: false, text: 'Deactivated' }]"
            :label="'Status'"
            subdued
          ></willow-select>
        </b-form-group>
      </b-card> -->
    </willow-layout-section>

  </willow-layout>

    <page-actions>
    <template slot="action-right">
      <willow-button  class="float-right mt-3" size="lg" primary @click.native="createUnit()">Save</willow-button>
    </template>
  </page-actions>

</page>
</template>

<script>
import api from '@/api/api'
import axios from 'axios'

export default {
  mounted () {
    this.fetch()
  },
  data () {
    return {
      pageHeader: {
        breadcrumbs: [
          {
            text: null,
            href: null
          }
        ]
      },
      unitForm: {
        unitId: '',
        propertyId: '',
        unitNumber: '',
        bedrooms: '',
        baths: '',
        sqFt: 0,
        smoking: '',
        description: '',
        marketRent: '',
        unitFeatures: []
      },
      building: {
        id: null,
        street: null
      }
    }
  },
  methods: {
    fetch () {
      axios.all([
        api.getBuilding(this.$route.params.building_id)
      ])
        .then(axios.spread((building) => {
          console.log(building.data.Id)
          this.building.id = building.data.Id
          this.building.street = building.data.Street
          this.pageHeader.breadcrumbs[0].text = building.data.Street
          this.pageHeader.breadcrumbs[0].href = '/Admin/buildings/' + building.data.Id
        }))
    },
    createUnit () {
      console.log(this.unitForm)
      api.createBuildingUnit(this.building.id, this.unitForm)
        .then(res => {
          console.log(res)
          this.$router.push({ path: this.pageHeader.breadcrumbs[0].href })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
