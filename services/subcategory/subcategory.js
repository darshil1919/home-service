import dbService from "../../utilities/dbService";

// --------------- add category ----------------
export const addSubCategory = async (req) => {
  const payload = req.body;

  let subCategoryData = await dbService.findOneRecord("subCategoryModel", {
    subCategoryName: payload.subCategoryName
  });

  if (subCategoryData) {
    throw new Error("Subcategory Already Exists!");
  }

  let categoryData = await dbService.findOneRecord("categoryModel", {
    _id: payload.categoryId
  });

  if (!categoryData) {
    throw new Error("Category Not Exists!");
  }

  let project = await dbService.createOneRecord("subCategoryModel", payload);
  // console.log("project data =>", project);
  return project;
};

// --------------- read all category ----------------
export const readSubCategory = async (req) => {
  let project = await dbService.findAllRecords("subCategoryModel", {isDelete: false});

  return project;
}

// -------------- update category --------------
export const updateSubCategory = async (req) => {
  const payload = req.body;

  // category exist or not
  let categoryData = await dbService.findOneRecord("categoryModel", {
    _id: payload.categoryId
  });
  
  if (!categoryData) {
    throw new Error("Category Not Exists!");
  }

  // same subcategory available or not
  let subCategoryData = await dbService.findOneRecord("subCategoryModel", {
    _id: payload._id,
    isDelete: false
  });

  if (!subCategoryData) {
    throw new Error("Subcategory Not Exists!");
  }

  
  let project = await dbService.findOneAndUpdateRecord("subCategoryModel",
  {_id: payload._id},
  payload,
  {runValidators: true, new: true}
  );

  return project;
}

// -------------- delete category -------------
export const deleteSubCategory = async (req) => {
  const { _id } = req.body;

  let subCategoryData = await dbService.findOneRecord("subCategoryModel", {
    _id: _id,
    isDelete: false
  });

  if (!subCategoryData) {
    throw new Error("Subcategory Not Exists!");
  }

  let project = await dbService.findOneAndUpdateRecord("subCategoryModel",
  {_id: _id},
  { deleteAt: Date.now(), isDelete: true},
  {runValidators: true, new: true}
  );

  return project;
}