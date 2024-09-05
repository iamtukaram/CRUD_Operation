import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// localhost url
const apiUrl = 'http://localhost:8001';




//user create here
export const createUser = createAsyncThunk(
  "userDetails/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify(data),
      });
      console.log(response)

      if (!response.ok) {

        throw new Error(error.response.data);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
     
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);



// read action 
export const showUser = createAsyncThunk(
  'showUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/getusers`);
      if (!response.ok) {
        // Handle non-2xx responses
        return rejectWithValue('Failed to fetch users');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching users:', error);
      return rejectWithValue(error.message);
    }
  }
);




// delete action
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/deleteuser/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return rejectWithValue('Failed to delete the user');
      }

      const result = await response.json();
      return id; // Return the ID of the deleted user
    } catch (error) {
      console.error('Error deleting user:', error);
      return rejectWithValue(error.message);
    }
  }
);




//Upadate User action
export const updateUser = createAsyncThunk(
  'user/update',
  async (updatedUser, { rejectWithValue }) => {
    const { id, ...data } = updatedUser;

    try {
      const response = await fetch(`${apiUrl}/updateuser/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      return { id, ...data, ...result };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




//slice here
export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload?.error ||  "An unexpected error occurred"; 
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.payload; 
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the user with the deleted ID from the state
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});



export default userDetails.reducer;
