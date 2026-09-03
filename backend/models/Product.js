import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },

    // Reference to Category collection
    category: {
    type: String,
    required: true,
    trim: true,
},

section: {
    type: String,
    required: true,
    trim: true,
},

item: {
    type: String,
    required: true,
    trim: true,
},

categoryName: {
    type: String,
    required: true,
    trim: true,
},

sectionName: {
    type: String,
    required: true,
    trim: true,
},

itemName: {
    type: String,
    required: true,
    trim: true,
},

    images: {
  type: [
    {
      url: {
        type: String,
        required: true,
      },
      fileId: {
        type: String,
        required: true,
      },
    },
  ],
  required: true,
  validate: {
    validator: (arr) => arr.length > 0,
    message: "At least one image is required",
  },
},

    // Multiple eco badges
    ecoBadges: {
  type: [String],
  required: true,
  validate: {
    validator: (arr) => arr.length > 0,
    message: "Select at least one eco badge",
  },
},
averageRating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},

sold: {
  type: Number,
  default: 0,
},

    // Product owner
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stock: {
      type: Number,
      default: 1,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);