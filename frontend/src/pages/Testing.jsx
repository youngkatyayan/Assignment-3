import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Testing = () => {
    const [data, setdata] = useState([])
    const [result, setResult] = useState([])
    const [updated, setUpdated] = useState(null)
    const [values, setValues] = useState({
        VMob1: '',
        NoOfFormsKN: ''
    })

    const handleDelete = async (Id) => {
        console.log(Id)
        try {
            const fetchData = await axios.delete(`/api/v1/delete/${Id}`)
            if (fetchData.data.success) {
                handleChangena()
            }
            console.log(fetchData)
        } catch (error) {
            console.log("Error in deletion")
        }
    }
    // Edit value
    const handleEdit = async (value) => {
        setUpdated(value)
        setValues({
            NoOfFormsKN: value.NoOfFormsKN || '',
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const Id = updated.Id
      const NoOfFormsKN=values
        try {
            const updateData = await axios.put(`/api/v1/get-update/${Id}`,NoOfFormsKN)
            // console.log(updateData)
            alert("ok")
            setUpdated(null)
        } catch (error) {
            console.log(error)
        }

    }
    const handleChange = async (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        try {
            const getSugg = await axios.post('/api/v1/get-sugg', { VMob1: value })
            if (getSugg.data.success) {
                setdata(getSugg.data.result)
            } else {
                console.log('x')
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChangena = async (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        try {
            const getAllDetial = await axios.post('/api/v1/get-alldetail', { NoOfFormsKN: value })

            console.log(getAllDetial.data.result)
            if (getAllDetial.data.success) {
                setResult(getAllDetial.data.result)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    const handleValueClick = (value) => {
        setValues({
            ...values,
            VMob1: value
        })
        setdata([])
    }
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setFocusedIndex((prev) =>
                prev < data.length - 1 ? prev + 1 : prev
            )
        }
        else if (e.key === 'ArrowUp') {
            setFocusedIndex((prev) =>
                prev > 0 ? prev - 1 : prev
            )
        }
        else if (e.key === 'Enter' && focusedIndex >= 0) {
            handleValueClick(data[focusedIndex].VMob1)
            setFocusedIndex(-1)
        }
    };



    useEffect(() => {
        if (focusedIndex >= 0 && focusedIndex < data.length) {
            setValues({ ...values, VMob1: data[focusedIndex].VMob1 });
        }
    }, [focusedIndex]);


    return (

        <div className='w-[92%] mx-auto my-5 pb-5 bg-white-100 border-1  rounded-md h-[full] px-3 ' style={{ boxShadow: '0 0 8px 2px #ddd' }}>

            <div className='container-fluid flex-col gap-2 flex'>
                <div className='flex items-center justify-between py-3'>
                    <div className='text-xl'>Voter's Details</div>
                    <p className='select-none text-sm'><sup>*</sup>fields are required</p>
                </div>
                <hr />
            </div>
            <form action="" onSubmit={handleSubmit}>
                <div className='container-fluid mt-4'>
                    <div className="row">
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Ward No</label>
                            <div className='flex gap-2 items-center '>
                                <input type="text" name="" className='outline-none border w-full px-2' placeholder='Ward no' />
                            </div>
                        </div>
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Form No</label>
                            <div className='flex gap-2 items-center '>
                                <input type="text" name="" className='outline-none border w-full px-2' placeholder='Form no' />
                            </div>
                        </div>
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Packet No</label>
                            <div className='flex gap-2 items-center '>
                                <input type="text" name="" className='outline-none border w-full px-2' placeholder='Packet no' />
                            </div>
                        </div>
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Mobile No</label>
                            <div className='flex flex-col gap-2 items-center relative'>
                                <input type="text" name="VMob1"
                                    value={values.VMob1} onKeyDown={handleKeyDown} className='outline-none border w-full px-2' placeholder='Mobile no' onChange={handleChange} />
                                {data.length > 0 && (
                                    <ul style={{ position: 'absolute', top: '30px', left: '5px', overflowY: 'auto', zIndex: 100, cursor: 'pointer' }} className='max-h-60 bg-white w-full px-2 py-1'>
                                        {data.map((c, i) => (
                                            <li key={i} onClick={() => handleValueClick(c.VMob1)} onMouseMove={() => setValues({ ...values, VMob1: c.VMob1 })}
                                                className={`hover:bg-[#ddd] px-2 ${focusedIndex === i ? 'bg-[#ddd]' : ''}`} value={c.id} >{c.VMob1}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="row mt-4 flex " >
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Aadhar No</label>
                            <div className='flex gap-2 items-center '>
                                <input type="text" name="" maxLength={12} pattern='^[1234567890]$' className='outline-none border w-full px-2' placeholder='Aadhar no' />
                            </div>
                        </div>
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Voter Name</label>
                            <div className='flex gap-2 items-center '>
                                <input type="text" name="NoOfFormsKN" value={values.NoOfFormsKN} className='outline-none border w-full px-2' placeholder='Voter Name' onChange={handleChangena} />
                            </div>
                        </div>
                        <div className="col-md-3 flex-col gap-2 flex mt-1">
                            <label htmlFor="" className='font-semibold'>Father Name</label>
                            <div className='flex gap-2 items-center '>
                                <input type="text" name="" className='outline-none border animated-border w-full px-2' placeholder='Father Name' />
                            </div>
                        </div>
                        <div className="col-md-3 flex-col gap-2 flex mt-[2.3rem] ">

                            <div className='flex gap-2 items-center '>
                                <button type='submit' className='btn btn-success h-[2rem]  outline-none border w-full px-2'>Submit</button>

                            </div>
                        </div>

                    </div>
                </div>
            </form>
            <div className="container-fluid mt-5">


                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>RefId</th>
                                        <th>NoOfFormsKN</th>
                                        <th>NoOfFormsKD</th>
                                        <th>FeedFormsKN</th>
                                        <th>PacketNo</th>
                                        <th>ERemarks</th>
                                        <th>SBy</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {values.NoOfFormsKN ? (
                                        result.map((item, index) => (
                                            <>
                                                <tr key={index}>
                                                    <td>{item.RefId == null ? '' : item.RefId}</td>
                                                    <td className='animate'>{item.NoOfFormsKN}</td>
                                                    <td>{item.NoOfFormsKD == null ? '' : item.NoOfFormsKD}</td>
                                                    <td>{item.FeedFormsKN == null ? '' : item.FeedFormsKN}</td>
                                                    <td>{item.PacketNo == null ? '' : item.PacketNo}</td>
                                                    <td>{item.ERemarks == null ? '' : item.ERemarks}</td>
                                                    <td>{item.SBy == null ? ' ' : item.SBy}</td>
                                                    <td className='flex gap-1'>
                                                        <button className='btn text-white btn-warning  ' style={{
                                                            textShadow: '1px 1px 1px',
                                                            letterSpacing: '.1rem'
                                                        }}>View</button>
                                                        <button className='btn btn-primary  ' onClick={() => handleEdit(item)}>Edit</button>
                                                        <button className='btn btn-danger ' onClick={() => handleDelete(item.Id)} >Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))) : ''
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Testing
