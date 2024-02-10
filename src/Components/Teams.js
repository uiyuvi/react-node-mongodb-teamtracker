import React from "react";

export function Teams(props) {
  const { data, edit, editId, empId, empName, experience, handleCancel, handleDone, handleEdit, handleDelete, handleChange } = props
  return (
    <>
      {/*code goes here to teams*/}
      {
        data.map((members, index) => {
          return (
            <table key={index}>
              <thead>
                <tr>
                  <td colSpan="6">{members[0].technology_name}</td>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => {
                  return (
                    <tr key={member._id}>
                      <td>{index + 1}</td>
                      {member._id === editId && edit ? (
                        <>
                          <td><input name="empId" type="text" value={empId} onChange={(e) => handleChange(e)} /></td>
                          <td><input name="empName" type="text" value={empName} onChange={(e) => handleChange(e)} /></td>
                          <td><input name="experience" type="text" value={experience} onChange={(e) => handleChange(e)} /></td>
                          <td><button type="button" onClick={(e) => handleDone(e)}>Done</button></td>
                          <td><button type="button" onClick={(e) => handleCancel(e, member._id)}>Cancel</button></td>
                        </>
                      ) : (
                        <>
                          <td>{member.employee_id}</td>
                          <td>{member.employee_name}</td>
                          <td>{member.experience}</td>
                          <td><button type="button" onClick={() => handleEdit(member._id)}>Edit</button></td>
                          <td><button type="button" onClick={(e) => handleDelete(e, member._id)}>Delete</button></td>
                        </>
                      )}
                    </tr>
                  )
                })}

              </tbody>
            </table>
          )
        })
      }
    </>
  );
}

export default Teams;
