import React from "react";
import {useDispatch} from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
function Goals({ goals }) {
const dispatch=useDispatch();
const deletegoal=(id)=>{
    dispatch(deleteGoal(id));
}
  return (
    <>
      {goals && goals.length>0 ? (
        goals.map((goal) => {
          return (
            <div className="w-4/5 p-1 bg-slate-400 flex justify-between">
            <div className="text-black font-bold capitalize">{goal.text}</div>
            <button className="mr-5" onClick={()=>{deletegoal(goal._id)}}>X</button>
            </div>
          );
        })
      ) : (
        <h1>No Goals TO SHow</h1>
      )}
    </>
  );
}

export default Goals;
