export const ValidationPage = (data) => {
    const errors = {}
    const regex = /^[A-Za-z]+$/;
    if (data.EFName.length<'3') {
        errors.EFName = ''
    } else if (!regex.test(data.EFName)) {
        errors.EFName = 'Name must be character'
    } else {
        errors.EFName = ''
    }

    if (data.ERFName.length<'3') {
        errors.ERFName = ''
    } else if (!regex.test(data.ERFName)) {
        errors.ERFName = 'Name must be character'
    } else {
        errors.ERFName = ''
    }
    if (data.VEName.length<'3') {
        errors.VEName = ''
    } else if (!regex.test(data.VEName)) {
        errors.VEName = 'Name must be character'
    } else {
        errors.VEName = ''
    }

    if (!/^\d*$/.test(data.MBActive)) {
        errors.MBActive = 'Mobile number must be number'
    }
    else if (data.MBActive.length > 10) {
        errors.MBActive = 'Mobile number must be 10 digits'
    }
    else {
        errors.MBActive = ''
    }
    return errors
}