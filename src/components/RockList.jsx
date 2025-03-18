import { useEffect } from "react";

export const RockList = ({ loc, rocks, fetchRocks }) => {
  useEffect(() => {
    fetchRocks(loc);
  }, [loc.to]);

  const deleteRock = async (rockId) => {
    const response = await fetch(`http://localhost:8000/rocks/${rockId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
      },
    });
    fetchRocks(loc);
  };

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          {rock.name} ({rock.type.label}) weighs {rock.weight} kg
          {loc.to === "allrocks" ? (
            `in the colloection of ${rock.user?.first_name} ${rock.user?.last_name}`
          ) : (
            <>
              <div className="float-right">
                <button
                  className="border-2 border-violet-900 rounded-md p-1"
                  onClick={() => deleteRock(rock.id)}
                >
                  delete
                </button>
              </div>
            </>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">
        {" "}
        {loc.to === "allrocks" ? "Rock List" : "My rocks"}
      </h1>
      {displayRocks()}
    </>
  );
};
