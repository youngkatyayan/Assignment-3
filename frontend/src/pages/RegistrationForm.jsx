import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Stream,
    University,
    Marital,
    Category,
    Religion,
    Gender,
} from "./Constaint.jsx";
const RegistrationForm = () => {
    const [stream, setstream] = useState("");
    const [university, setuniversity] = useState("");
    const [course, setcourse] = useState("");
    const [name, setname] = useState("");
    const [fname, setfname] = useState("");
    const [mname, setmname] = useState("");
    const [dob, setdob] = useState("");
    const [mobile, setphone] = useState("");
    const [email, setemail] = useState("");
    const [aadhar, setaadhar] = useState("");
    const [marital, setmstatus] = useState("");
    const [category, setcategory] = useState("");
    const [nationality, setnation] = useState("");
    const [religion, setreligion] = useState("");
    const [gender, setgender] = useState("");
    const [StateName, setDStateName] = useState([]);
    const [DistrictName, setDistrictName] = useState([]);
    const [iboard, setSelectBoard] = useState("");
    const [hboard, setSelectHighBoard] = useState("");
    const [state, setState] = useState("");
    const [hper, setHPer] = useState("");
    const [hypass, setHYOP] = useState("");
    const [hsub, setHsub] = useState("");
    const [iper, setiper] = useState("");
    const [iypass, setiypass] = useState("");
    const [isub, setisub] = useState("");
    const [gdeg, setgdeg] = useState("");
    const [gboard, setgboard] = useState("");
    const [gper, setgper] = useState("");
    const [gypass, setgypass] = useState("");
    const [gsub, setgsub] = useState("");
    const [dboard, setdboard] = useState("");
    const [dper, setdper] = useState("");
    const [dypass, setdypass] = useState("");
    const [dsub, setdsub] = useState("");
    const [district, setdistict] = useState("");
    const [paddress, setpaddress] = useState("");
    const [pincode, setpcode] = useState("");
    const [courseIT, setcourseIT] = useState("");
    const [AST, setAST] = useState([])
    const [Course, setCourse] = useState([])
    // handle submit form

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const fetchData = await axios.post("/api/v1/register", {
                stream,
                university,
                course,
                name,
                fname,
                mname,
                dob,
                mobile,
                email,
                aadhar,
                marital,
                category,
                nationality,
                religion,
                gender,
                iboard,
                hboard,
                state,
                hper,
                hypass,
                hsub,
                iper,
                iypass,
                isub,
                gdeg: gdeg || "NA",
                gboard: gboard || "NA",
                gper: gper || "NA",
                gypass: gypass || "NA",
                gsub: gsub || "NA",
                dboard: dboard || "NA",
                dper: dper || "NA",
                dypass: dypass || "NA",
                dsub: dsub || "NA",
                district,
                paddress,
                pincode,
                courseIT
            });
            if (fetchData.data.success) {
                console.log(fetchData.data.message);
            }
        } catch (error) {
            console.log(`Something wrong to submit form ${error}`);
        }
    };
    // get district data according to state
    const fetchDistrictData = async (e) => {
        const xstate = e.target.value;
        setState(xstate);
        try {
            const districtData = await axios.post("/api/v1/districtData", { xstate });
            if (districtData.data.success) {
                setDistrictName(districtData.data.result);
            }
        } catch (error) {
            console.error("Error fetching district data:", error);
        }
    };

    //get course data according to university
    const courseHandle = async (e) => {
        const xuniversity = e.target.value
        console.log(xuniversity)
        setuniversity(xuniversity)
        try {
            const courseData = await axios.post('/api/v1/universitycourse', { xuniversity })
            if (courseData.data.success) {
                setCourse(courseData.data.result)
                console.log(courseData.data.result)
            }
        } catch (error) {
            console.log(`Something wrong in coursehandle`, error)
        }
    }
    //get Ast data according to ...
    const fetchData = async () => {
        const courseData = await axios.get('/api/v1/astdata')
        setAST(courseData.data.result)

    }
    const fetchStateData = async () => {
        const stateData = await axios.get("/api/v1/statedata");
        if (stateData.data.success) {
            setDStateName(stateData.data.result);
        }
    };

    useEffect(() => {
        fetchStateData();
        fetchData()
    }, []);
    // Handle university course according to university
    const handleUniCourse = async (e) => {
        setcourse(e.target.value)
        
    }
    return (
        <>

            <div className="sm:w-[80%] w-[96%] mx-auto h-full my-3 rounded-md relative pb-2" style={{ boxShadow: '0 0 5px 1px #ddd' }}>
                <div className="w-[100%]  h-[20vh] rounded-md bg-blue-600 flex items-center justify-center "  >
                    <h1 className="text-4xl uppercase font-semibold text-white">Admission Form</h1>
                </div>

                <form action="" onSubmit={handleSubmitForm}>
                    <div className=' sm:w-[100%] w-[96%] mx-auto sm:px-16 p-3 flex-col flex gap-8  border-b-2 bg-white sm:left-[4vw]  left-[2vw] rounded'>
                        {/* About stream */}
                        <div className=' flex gap-1'>
                            <label htmlFor="" className=' text-lg whitespace-nowrap '>Admission Type :</label>
                            <select className='px-2 sm:px-5 w-[60%] py-1 ml-5' name='' value={stream} onChange={(e) => { setstream(e.target.value) }}>
                                <option value=''>--Select Admission Type--</option>
                                {
                                    Stream.map(c => (
                                        <option key={c.value} >{c.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* About University */}
                        {stream == "University Cources" && (
                            < div className='flex   gap-3'>
                                <label htmlFor="" className='text-lg whitespace-nowrap '>University :</label>
                                <select className='px-2 sm:px-5 ml-[4vw] w-[60%] py-1' name='' value={university} onChange={courseHandle}>
                                    <option value=''>--Select University--</option>
                                    {
                                        University.map(c => (
                                            <option value={c.value} key={c._id}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
                        {
                            stream == "Advance Software Training" &&

                            (
                                < div className='flex  gap-3'>
                                    <label htmlFor="" className='text-lg whitespace-nowrap '>Course :</label>
                                    <select className='px-2 sm:px-5 ml-[6vw] w-[60%] py-1' name='' value={courseIT} onChange={(e) => { setcourseIT(e.target.value) }}>
                                        <option value=''>--Select Advance Software Courses--</option>
                                        {
                                            AST.map(c => (
                                                <option key={c._id} value={c.courseAST}>{c.courseAST}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }

                        {/* About cources */}
                        <div className=' flex sm:gap-2 gap-2'>
                            <label htmlFor="" className='text-lg whitespace-nowrap '>University Courses :</label>
                            <select className='px-2 sm:px-5 w-[60%] py-1' name='' value={course} onChange={handleUniCourse}>
                                <option value=''>--Select Course--</option>
                                {
                                    Course.map(c => (
                                        <option key={c._id} value={c.ccode}>{c.course}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Information datail */}
                        <div className='flex flex-wrap  mt-5 items-center gap-3 justify-between'>

                            <div className='flex gap-3 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Student Name :</label>
                                <input type="text" name="" id="" value={name} onChange={(e) => { setname(e.target.value) }}
                                    className='border-2 w-[100%] md:w-[15rem]  sm:w-[16vw] px-2' placeholder='Enter your name...' />
                            </div>

                            <div className=''>
                                <div className='flex gap-4 items-center justify-center'>
                                    <label htmlFor="" className='whitespace-nowrap'>Date of Birth :</label>
                                    <input type="date" name="" id="" value={dob} onChange={(e) => { setdob(e.target.value) }}
                                        className='border-2 w-[100%]  md:w-[15rem] sm:w-[16vw] px-2' placeholder='Enter your name...' />
                                </div>
                            </div>

                        </div>
                        {/* fname and manae */}
                        <div className='flex flex-wrap  items-center gap-3 justify-between'>

                            <div className='flex gap-3 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Father's Name :</label>
                                <input type="text" name="" id="" value={fname} onChange={(e) => { setfname(e.target.value) }}
                                    className='border-2 w-[100%]  md:w-[15rem]  sm:w-[16vw] px-2' placeholder='Enter your father name...' />
                            </div>

                            <div className=''>
                                <div className='flex gap-4 items-center justify-center'>
                                    <label htmlFor="" className='whitespace-nowrap'>Mother's Name :</label>
                                    <input type="text" name="" id="" value={mname} onChange={(e) => { setmname(e.target.value) }}
                                        className='border-2 w-[100%]  md:w-[15rem] sm:w-[16vw] px-2' placeholder='Enter your mother name...' />
                                </div>
                            </div>

                        </div>
                        {/* email and phone */}
                        <div className='flex flex-wrap  items-center gap-3 justify-between'>

                            <div className='flex gap-12 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>E-mail ID :</label>
                                <input type="email" name="" id="" value={email} onChange={(e) => { setemail(e.target.value) }}
                                    className='border-2 w-[100%]  md:w-[15rem]  sm:w-[16vw] px-2' placeholder='userx@gmail.com' />
                            </div>

                            <div className=''>
                                <div className='flex gap-4 items-center justify-center'>
                                    <label htmlFor="" className='whitespace-nowrap'>Mobile No :</label>
                                    <input type="number" name="" id="" value={mobile} onChange={(e) => { setphone(e.target.value) }}
                                        className='border-2 w-[100%]  md:w-[15rem] sm:w-[16vw] px-2' placeholder='+91-96******32' />
                                </div>
                            </div>

                        </div>
                        {/* aadhar number and martial status */}
                        <div className='flex flex-wrap  items-center gap-3 justify-between'>

                            <div className='flex gap-9 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Aadhar No :</label>
                                <input type="text" name="" id="" value={aadhar} onChange={(e) => { setaadhar(e.target.value) }}
                                    className='border-2 w-[100%] md:w-[15rem]  sm:w-[16vw] px-2' placeholder='Enter your aadhar number..' />
                            </div>


                            <div className='flex gap-6 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Martial Status :</label>
                                <select className='px-2 sm:px-5 w-[100%] py-1  md:w-[15rem]' value={marital} onChange={(e) => { setmstatus(e.target.value) }}>
                                    <option value="" >Select Martial Status</option>
                                    {
                                        Marital.map(c => (
                                            <option key={c.value}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {/* Category */}

                        <div className='flex flex-wrap  items-center gap-3 justify-between'>
                            <div className='flex gap-11 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Category :</label>
                                <select className='px-2 sm:px-5 w-[100%] py-1  md:w-[15rem]' value={category} onChange={(e) => { setcategory(e.target.value) }}>
                                    <option value="" >Select Category</option>
                                    {
                                        Category.map(c => (
                                            <option key={c.value} >{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* nationality */}
                            <div className='flex gap-9 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Nationality :</label>
                                <input type="text" name="" id="" value={nationality} onChange={(e) => { setnation(e.target.value) }}
                                    className='border-2 w-[100%] md:w-[15rem]  sm:w-[16vw] px-2' />
                            </div>
                        </div>
                        {/* gender and religion */}
                        <div className='flex flex-wrap  items-center gap-3 justify-between'>
                            <div className='flex gap-12 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Religion :</label>
                                <select className='px-2 sm:px-5 w-[100%] py-1  md:w-[15rem]' value={religion} onChange={(e) => { setreligion(e.target.value) }}>
                                    <option value="" >Select Religion</option>
                                    {
                                        Religion.map(c => (
                                            <option key={c.value}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>



                            <div className='flex gap-12 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Gender :</label>
                                <select className='px-2 sm:px-5 w-[100%] py-1  md:w-[15rem]' value={gender} onChange={(e) => { setgender(e.target.value) }}>
                                    <option value="" >Select Gender</option>
                                    {
                                        Gender.map(c => (
                                            <option key={c.value}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        {/* address */}
                        <div className='p-2'>
                            <label htmlFor="" className='text-lg'>Permanent Address :</label><br />
                            <textarea name="" id="" className='border-2 my-2 mx-auto w-full' rows='5' value={paddress} onChange={(e) => setpaddress(e.target.value)}></textarea>
                        </div>
                        {/* state district pincode */}
                        <div className='flex flex-wrap  items-center gap-3 justify-between'>
                            <div className='flex gap-2 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>State :</label>
                                <select className='px-2 sm:px-3 w-[100%] py-1  md:w-[13rem]' value={state} onChange={fetchDistrictData}>
                                    <option value="" >Select State</option>
                                    {
                                        StateName.map(c => (
                                            <option key={c.id}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='flex gap-2 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>District :</label>
                                <select className='px-2 sm:px-3 w-[100%] py-1 md:w-[13rem]' value={district} onChange={(e) => { setdistict(e.target.value) }}>
                                    <option value="" >Select District</option>
                                    {
                                        DistrictName.map(c => (
                                            <option value={c.name} key={c.id}>{c.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='flex gap-2 items-center justify-center'>
                                <label htmlFor="" className='whitespace-nowrap'>Pincode :</label>
                                <input type="text" name="" id="" value={pincode} onChange={(e) => { setpcode(e.target.value) }}
                                    className='border-2 w-[100%] md:w-[8rem]  sm:w-[8vw] px-2' />
                            </div>
                        </div>

                        <div className='my-3'>
                            <h1 className='py-2 text-2xl uppercase font-semibold'>Qualification Exam Details</h1>
                            <div className='table-responsive'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Examination</th>

                                            <th scope="col">Board/University</th>
                                            <th scope="col">% or Division</th>
                                            <th scope="col">Year of Passing</th>
                                            <th scope="col">Subjects</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>HighSchool</td>

                                            <td><input id="board10th" required value={hboard} onChange={(e) => { setSelectHighBoard(e.target.value) }}>

                                            </input></td>
                                            <td><input type="text" required name="percentage10th" className='w-32' id="percentage10th" value={hper} onChange={(e) => setHPer(e.target.value)} />
                                            </td>
                                            <td><input name="passingyear" required className='w-32' id="passingyear" value={hypass} onChange={(e) => setHYOP(e.target.value)}>

                                            </input></td>
                                            <td><input type="text" required name="subject10th" id="subject10th" value={hsub} onChange={(e) => setHsub(e.target.value)} />

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>10+2 or Equivalent</td>

                                            <td><input id="board10th" required value={iboard} onChange={(e) => { setSelectBoard(e.target.value) }}>
                                            </input></td>
                                            <td><input type="text" required className='w-32' value={iper} onChange={(e) => setiper(e.target.value)} /></td>
                                            <td><input type="text" required className='w-32' value={iypass} onChange={(e) => setiypass(e.target.value)} /></td>
                                            <td><input type="text" required value={isub} onChange={(e) => setisub(e.target.value)} /></td>
                                        </tr>
                                        <tr>
                                            <td>Graduation</td>

                                            <td><input type="text" value={gboard} onChange={(e) => setgboard(e.target.value)} /></td>
                                            <td><input type="text" className='w-32' value={gper} onChange={(e) => setgper(e.target.value)} /></td>
                                            <td><input type="text" className='w-32' value={gypass} onChange={(e) => setgypass(e.target.value)} /></td>
                                            <td><input type="text" value={gsub} onChange={(e) => setgsub(e.target.value)} /></td>
                                        </tr>
                                        <tr>
                                            <td>Diploma</td>

                                            <td><input type="text" value={dboard} onChange={(e) => setdboard(e.target.value)} /></td>
                                            <td><input type="text" className='w-32' value={dper} onChange={(e) => setdper(e.target.value)} /></td>
                                            <td><input type="text" className='w-32' value={dypass} onChange={(e) => setdypass(e.target.value)} /></td>
                                            <td><input type="text" value={dsub} onChange={(e) => setdsub(e.target.value)} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-success py-1 text-lg font-semibold'>Save</button>
                    </div>
                </form >



            </div >

        </>
    );
};

export default RegistrationForm;
