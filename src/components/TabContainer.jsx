import FormField from "./FormField";
import Log from "./Log";
import LogSearchFilterBar from "./LogSearchFilterBar";
import TabSection from "./TabSection";
import TagDisplay from "./TagDisplay";

export default function TabContainer({ logRef, logs, dogInformationSchema, showLogTab, appliedFilters, setAppliedFilters, setSearchQuery, tags, removeTag, filteredLogs }) {
  
  
    return (
    <div
      ref={logRef}
      className="mt-8 mb-8 shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden bg-foreground p-8"
    >
      <TabSection defaultTab={showLogTab ? "logs" : "information"}>
        <div label="information">
          <div className="w-full grid grid-cols-3 gap-16">
            {Object.keys(dogInformationSchema).map((category) => (
              <div className="col" key={category}>
                <div className="flex-col space-y-4 text-lg">
                  <div className="text-xl">
                    <strong>{category}</strong>
                  </div>

                  {Object.keys(dogInformationSchema[category]).map((col) => {
                    const { key: formKey } =
                      dogInformationSchema[category][col];

                    return (
                      <FormField key={col} keyLabel={formKey} label={col} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div label="logs">
          <div className="flex-grow flex-col space-y-4">
            <LogSearchFilterBar
              filters={appliedFilters}
              setFilters={setAppliedFilters}
              setSearch={setSearchQuery}
              addLogFunction={() => setShowLogModal(true)}
            />

            <TagDisplay tags={tags} removeTag={removeTag} />

            {/* TODO: move to static array, toggle hidden field */}
            {filteredLogs.map((log) => {
              return <Log log={log} key={log._id} />;
            })}
            <div className="flex justify-center">
              Displaying {filteredLogs.length} out of {logs.length}{" "}
              {logs.length == 1 ? "log" : "logs"}
            </div>
          </div>
        </div>
      </TabSection>
    </div>
  );
}
