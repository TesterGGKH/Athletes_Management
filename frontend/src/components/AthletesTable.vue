<template>
  <div class="container mx-auto p-4">
    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        v-model="search"
        placeholder="Search athletes..."
        class="w-full max-w-sm px-4 py-2 border rounded"
      />
    </div>

    <!-- Add Athlete Form -->
    <form @submit.prevent="addAthlete" class="mb-4">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <input
          v-model="newAthlete.name"
          placeholder="Name"
          class="px-4 py-2 border rounded"
          required
        />
        <select
          v-model="newAthlete.gender"
          class="px-4 py-2 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          v-model="newAthlete.sport"
          placeholder="Sport"
          class="px-4 py-2 border rounded"
          required
        />
        <input
          v-model.number="newAthlete.age"
          type="number"
          placeholder="Age"
          class="px-4 py-2 border rounded"
          required
        />
        <input
          v-model="newAthlete.country"
          placeholder="Country"
          class="px-4 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Athlete
      </button>
    </form>

    <!-- Athletes Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b bg-gray-100">Name</th>
            <th class="px-6 py-3 border-b bg-gray-100">Gender</th>
            <th class="px-6 py-3 border-b bg-gray-100">Sport</th>
            <th class="px-6 py-3 border-b bg-gray-100">Age</th>
            <th class="px-6 py-3 border-b bg-gray-100">Country</th>
            <th class="px-6 py-3 border-b bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="athlete in athletes" :key="athlete.id">
            <td class="px-6 py-4 border-b">{{ athlete.name }}</td>
            <td class="px-6 py-4 border-b">{{ athlete.gender }}</td>
            <td class="px-6 py-4 border-b">{{ athlete.sport }}</td>
            <td class="px-6 py-4 border-b">{{ athlete.age }}</td>
            <td class="px-6 py-4 border-b">{{ athlete.country }}</td>
            <td class="px-6 py-4 border-b">
              <button
                @click="deleteAthlete(athlete.id)"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
  name: 'AthletesTable',
  setup() {
    const athletes = ref([])
    const search = ref('')
    const newAthlete = ref({
      name: '',
      gender: '',
      sport: '',
      age: '',
      country: ''
    })

    const fetchAthletes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/athletes')
        athletes.value = response.data.data || []
      } catch (error) {
        console.error('Error fetching athletes:', error)
      }
    }

    const addAthlete = async () => {
      try {
        await axios.post('http://localhost:3000/api/athletes', newAthlete.value)
        newAthlete.value = { name: '', gender: '', sport: '', age: '', country: '' }
        await fetchAthletes()
      } catch (error) {
        console.error('Error adding athlete:', error)
      }
    }

    const deleteAthlete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/athletes/${id}`)
        await fetchAthletes()
      } catch (error) {
        console.error('Error deleting athlete:', error)
      }
    }

    onMounted(fetchAthletes)

    return {
      athletes,
      search,
      newAthlete,
      addAthlete,
      deleteAthlete
    }
  }
}
</script>
