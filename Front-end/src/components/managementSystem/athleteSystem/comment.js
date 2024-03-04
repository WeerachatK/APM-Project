<Modal.Body>
<div className="space-y-4">
    <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="profile_pic">Profile Picture URL:</label>
        <input type="text" name="profile_pic" value={formData.profile_pic} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="country">Country:</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="bib">BIB:</label>
        <input type="text" name="bib" value={formData.bib} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="input">
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>
    </div>
    <div>
        <label htmlFor="date_of_birth">Date of Birth:</label>
        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="phone_number">Phone Number:</label>
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="classification">Classification:</label>
        <input type="text" name="classification" value={formData.classification} onChange={handleChange} className="input" />
    </div>
    <div>
        <label htmlFor="remark">Remark:</label>
        <textarea name="remark" value={formData.remark} onChange={handleChange} className="input"></textarea>
    </div>
</div>
</Modal.Body>