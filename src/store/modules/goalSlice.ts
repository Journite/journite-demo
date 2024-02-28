import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
} from "@reduxjs/toolkit";
import { child, get, push, ref, remove, set, update } from "firebase/database";
import { db } from "../../config/firebase";
import { Goal } from "../../shared/model/goal.model";
import { objectToArray } from "../../shared/utils/fn.utils";
import { getAuth } from "firebase/auth";
import { getStore } from "..";
import { getUid } from "../../shared/utils/auth.utils";

const initialState: {
  goalList: Goal[];
  selectedGoalId?: String;
  loading: boolean;
  isEdit: boolean;
  updateSuccess: boolean;
  updating: boolean;
} = {
  goalList: [],
  loading: false,
  isEdit: false,
  updateSuccess: false,
  updating: false,
};

const refBase = "/goals";

export const getListOfGoals = createAsyncThunk("goals/fetch_all", async () => {
  const uid = getUid();
  const goalsRef = ref(db);
  return await get(child(goalsRef, uid + refBase));
});

export const createGoal = createAsyncThunk(
  "goals/create_new",
  async (goal: Goal) => {
    const uid = getUid();
    const goalRef = push(child(ref(db), uid + refBase));
    return await set(goalRef, goal);
  },
);

export const updateGoal = createAsyncThunk(
  "goals/update",
  async (goal: Goal) => {
    const uid = getUid();
    const goalRef = ref(db, uid + refBase + "/" + goal.id);
    delete goal.id;
    return await update(goalRef, goal);
  },
);

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string) => {
    const uid = getUid();
    const goalRef = ref(db, uid + refBase + "/" + id);
    return await remove(goalRef);
  },
);

export const GoalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset(state) {
      state.goalList = [];
      state.selectedGoalId = undefined;
      state.loading = false;
    },
    setSelectedGoal(state, action: { payload: string | undefined }) {
      state.selectedGoalId = action.payload;
    },
    setIsEdit(state, action: { payload: boolean }) {
      state.isEdit = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListOfGoals.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.val();
        if (data) state.goalList = objectToArray(data) as Goal[];
        else state.goalList = [];
      })
      //   .addCase(getDebbyId.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.currentDeb = {
      //       ...action.payload.data(),
      //       startMonth: new Date(
      //         action.payload.data()?.startMonth.seconds * 1000,
      //       ),
      //       id: action.payload.id,
      //     } as Deb;
      //   })
      .addMatcher(isPending(createGoal, updateGoal, deleteGoal), (state) => {
        state.updating = true;
        state.updateSuccess = false;
      })
      .addMatcher(isFulfilled(createGoal, updateGoal, deleteGoal), (state) => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(getListOfGoals), (state) => {
        state.loading = true;
      });
  },
});

export const { reset, setSelectedGoal, setIsEdit } = GoalSlice.actions;

export default GoalSlice.reducer;
