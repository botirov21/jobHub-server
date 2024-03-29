const asyncHandler = require("../middleware/async");
const Jobs = require("../models/job");


// Create data
exports.createNewJob = asyncHandler(async (req, res, next) => {
    const newJob = await Jobs.create({
        name: req.body.name,
        location: req.body.location,
        experience: req.body.experience,
        education: req.body.education,
        corporateType: req.body.corporateType,
        employmentType: req.body.employmentType,
        salary: req.body.salary,
        jobPosition: req.body.jobPosition,
        role: req.body.role,
        responsibilities: req.body.responsibilities,
        idealCandidate: req.body.idealCandidate,
    });
    res.status(200).json({
        success: true,
        data: newJob,
    });
});

// Get all data
exports.getAllJobs = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Jobs.countDocuments();
  
    const jobs = await Jobs.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: jobs,    
    });
});

// Get data by id
exports.getJobById = asyncHandler(async (req, res, next) => {
    const jobId = req.params.id;
    const data = await Jobs.findById(jobId);

    res.status(200).json(data);
});

// Update data
exports.updateJob = asyncHandler(async (req, res) => {
    const jobId = await Jobs.findById(req.params.id)
    if(!jobId){
        return res.status(404).json({
            success: false,
            error: "not found"
        })
    }
    const updatedData = {
        name: req.body.name,
        location: req.body.location,
        experience: req.body.experience,
        education: req.body.education,
        corporateType: req.body.corporateType,
        employmentType: req.body.employmentType,
        salary: req.body.salary,
        jobPosition: req.body.jobPosition,
        role: req.body.role,
        responsibilities: req.body.responsibilities,
        idealCandidate: req.body.idealCandidate,
    };
    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });
    res.status(200).json({
        success: true, 
        data: updatedJob,
    });
});

//Delete data
exports.deleteJob = asyncHandler(async (req, res) => {
    await Jobs.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})
