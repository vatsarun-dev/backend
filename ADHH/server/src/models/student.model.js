import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    class: {
      type: Number,
      required: true,
      min: 1,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    totalFees: {
      type: Number,
      required: true,
      min: 0,
    },

    paidFees: {
      type: Number,
      default: 0,
      min: 0,
    },

    pendingFees: {
      type: Number,
      default: function () {
        return this.totalFees;
      },
    },

    dueDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

// Automatically update pending fees and status
studentSchema.pre("save", function () {
  this.pendingFees = this.totalFees - this.paidFees;

  if (this.pendingFees <= 0) {
    this.status = "Paid";
  } else if (this.paidFees > 0) {
    this.status = "Partial";
  } else {
    this.status = "Pending";
  }
});

const studentModel = model("Student", studentSchema);
export default studentModel;
