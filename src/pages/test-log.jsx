/**
 * Testing page to resolve and unresolve logs
 *
 * @returns {React.ReactElement} The TestLog page
 */

export default function TestLog() {
    async function updateLogResolution(resolved) {
        try {
            const LOG_ID = "65d2926a2b36e2555782a1f9"  //must hardcode in specific log (C/P from database)
            const response = await fetch(`/api/logs/` + LOG_ID, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                resolved: resolved,
                resolution: "I am resolving this log from test-log.jsx",
                tags: [],
                title: "Log Title",
                topic: "Medical",
                severity: "None",
                author: "65cf83f8deda87bd15394b7e", // assigned random author and dog
                dog: "65cf83fbdeda87bd15394c66",
                // resolver will be automatically assigned from session
                //for testing purposes, code checks if session.user.role === User
              }),
            });
    
          if (!response.ok) {
            const errorData = await response.json();
            return {
              success: false,
              message: errorData.message || 'Failed to update log resolution status',
            };
          }
    
          const data = await response.json();
          return {
            success: true,
            message: 'Log resolution status updated successfully',
            data: data,
          };
        } catch (error) {
          console.error('Error updating log resolution status:', error);
          return {
            success: false,
            message: 'An error occurred while updating the log resolution status',
          };
        }
      }
    
      const handleResolveLog = async (resolved) => {
        const result = await updateLogResolution(resolved);
        if (result.success) {
          console.log(result.message, result.data);
        } else {
          console.error(result.message);
        }
      }; 

    return (
        <div className="flex flex-col text-3xl text-center">
            <button className="my-7" onClick={() => handleResolveLog(true)}>
                Set Log Resolution True
            </button>

            <button className="my-7" onClick={() => handleResolveLog(false)}>
                Set Log Resolution False
            </button>
            <p className="mt-8">How to Test:</p>
            <p>Go to local database and copy some existing log _id</p>
            <p>In pages/test-log.jsx, hardcode value into LOG_ID</p>
            <p>Press on either button and view changed log in console</p>
        </div>
    );
}