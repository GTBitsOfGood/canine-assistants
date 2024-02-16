export default function TestLog() {
    async function updateLogResolution() {
        try {
            const logid = "65cf8403deda87bd15394f06"
            const response = await fetch(`/api/logs/` + logid, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                resolved: true,
                tags: [],
                title: "Log Title",
                topic: "Medical",
                severity: "None",
                author: "65cf83f8deda87bd15394b7e",
                dog: "65cf83fbdeda87bd15394c66",
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
    
      const handleUpdateLogResolution = async () => {
        const result = await updateLogResolution();
        if (result.success) {
          console.log(result.message, result.data);
        } else {
          console.error(result.message);
        }
      }; 

    return (
        <div>
            <button onClick={() => handleUpdateLogResolution()}>
                Set Log Resolution True
            </button>
        </div>
    );
}