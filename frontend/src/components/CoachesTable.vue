<template>
    <div>
      <!-- Search Bar -->
      <input
        type="text"
        v-model="search"
        placeholder="Search coaches..."
        class="w-full px-4 py-2 mb-4 border rounded-lg"
      />
  
      <!-- Add Coach Form -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          v-model="newCoach.name"
          placeholder="Name"
          class="px-4 py-2 border rounded-lg"
        />
        <select
          v-model="newCoach.gender"
          class="px-4 py-2 border rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          v-model="newCoach.sport"
          placeholder="Sport"
          class="px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          v-model.number="newCoach.age"
          placeholder="Age"
          class="px-4 py-2 border rounded-lg"
        />
        <input
          v-model="newCoach.country"
          placeholder="Country"
          class="px-4 py-2 border rounded-lg"
        />
      </div>
      <button
        @click="addCoach"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-6"
      >
        Add Coach
      </button>
  
      <!-- Coaches Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="text-left px-6 py-3">Name</th>
              <th class="text-left px-6 py-3">Gender</th>
              <th class="text-left px-6 py-3">Sport</th>
              <th class="text-left px-6 py-3">Age</th>
              <th class="text-left px-6 py-3">Country</th>
              <th class="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coach in coaches" :key="coach.id" class="border-t">
              <td class="px-6 py-4">{{ coach.name }}</td>
              <td class="px-6 py-4">{{ coach.gender }}</td>
              <td class="px-6 py-4">{{ coach.sport }}</td>
              <td class="px-6 py-4">{{ coach.age }}</td>
              <td class="px-6 py-4">{{ coach.country }}</td>
              <td class="px-6 py-4">
                <button
                  @click="deleteCoach(coach.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  export default {
    name: 'CoachesTable',
    setup() {
      const coaches = ref([])
      const search = ref('')
      const newCoach = ref({
        name: '',
        gender: '',
        sport: '',
        age: '',
        country: ''
      })
  
      const fetchCoaches = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/coaches')
          coaches.value = response.data.data
        } catch (error) {
          console.error('Error fetching coaches:', error)
        }
      }
  
      const addCoach = async () => {
        try {
          await axios.post('http://localhost:3000/api/coaches', newCoach.value)
          newCoach.value = {
            name: '',
            gender: '',
            sport: '',
            age: '',
            country: ''
          }
          await fetchCoaches()
        } catch (error) {
          console.error('Error adding coach:', error)
        }
      }
  
      const deleteCoach = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/api/coaches/${id}`)
          await fetchCoaches()
        } catch (error) {
          console.error('Error deleting coach:', error)
        }
      }
  
      onMounted(fetchCoaches)
  
      return {
        coaches,
        search,
        newCoach,
        addCoach,
        deleteCoach
      }
    }
  }
  </script>