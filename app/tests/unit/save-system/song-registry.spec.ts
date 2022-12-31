import { SongItem } from "@/music-page/song-item";
import { SongRegistry } from "@/save-system/song-registry";
import { assert } from "@vue/compiler-core";

const testRegistryData = () => ["this","is","test","data","don't","mind","me",".","It's","only","temporary",",","soon","better","stuff","will","be","here"].slice();
const pathNotInRegistryData = "This text is not found in the default registry data";

test("constructor is working", () => {
    let isSuccessful = true;
    const testReg = new SongRegistry(testRegistryData());
    for(var path of testRegistryData()) {
        if(!testReg.contains(path)) {
            isSuccessful = false;
            break;
        }
    }
    assert(isSuccessful);
});

describe("push is working", () => {
    test("song gets added", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = true;
        if(testReg.contains(pathNotInRegistryData)) {
            isSuccessful = false;
        }

        testReg.push(pathNotInRegistryData);
        if(!testReg.contains(pathNotInRegistryData)) {
            isSuccessful = false;
        }
        assert(isSuccessful);
    });
    test("can't push duplicate", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        try {
            testReg.push(testRegistryData()[0]);
        }
        catch {
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
    test("can't move first item", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        try{
            testReg.moveUp(testRegistryData()[0]);
        }
        catch{
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
    test("can't move nonexistent item", () => {
        const testReg = new SongRegistry([]);
        let isSuccessful = false;
        try{
            testReg.moveUp(testRegistryData()[0]);
        }
        catch{
            isSuccessful = true;
        }
        assert(isSuccessful);
    })
});

describe("remove is working", () => {
    test("song is removed", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = true;
        for(var path of testRegistryData()) {
            testReg.remove(path);
            if(testReg.contains(path)) {
                isSuccessful = false;
                break;
            }
        }
        assert(isSuccessful);
    });
    test("can't remove nonexistent song", () => {
        const testReg = new SongRegistry([]);
        let isSuccessful = false;
        try {
            testReg.remove(testRegistryData()[0]);
        }
        catch {
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
});

describe("replace is working", () => {
    test("replace is successful", () => {
        const testReg = new SongRegistry(testRegistryData());
        const testPath = "this is a test, just for test purposes.";
        let isSuccessful = true;
            testReg.replace(testRegistryData()[0],testPath);
            if(testReg.getIndexOf(testPath) !== 0) {
                isSuccessful = false;
            }
            assert(isSuccessful);
        }
    );
    test("can't replace nonexistent song from registry", () => {
        const testReg = new SongRegistry([]);
        let isSuccessful = false;
        try{
            testReg.replace(testRegistryData()[0],testRegistryData()[1]);
        }
        catch {
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
    test("can't replace song with a duplicate entry", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        try{
            testReg.replace(testRegistryData()[0],testRegistryData()[1]);
        }
        catch {
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
});

test("contains is working", () => {
    let isSuccessful = true;
    const testReg = new SongRegistry(testRegistryData());
    for(var path of testRegistryData()) {
        if(!testReg.contains(path)) {
            isSuccessful = false;
            break;
        }
    }
    assert(isSuccessful);
});

describe("moveUp is working", () => {
    test("entry moves up", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        testReg.moveUp(testRegistryData()[1]);
        console.debug(testReg.getIndexOf(testRegistryData()[1]));
        if(testReg.getIndexOf(testRegistryData()[0]) === 1) {
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
    test("can't move first entry", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        try {
            testReg.moveUp(testRegistryData()[0]);
        }
        catch {
            console.debug(isSuccessful);
            isSuccessful = true
            console.debug(isSuccessful);
        }
        assert(isSuccessful);
    });
    test("can't move nonexistent entry", () => {
        const testReg = new SongRegistry([]);
        let isSuccessful = false;
        try {
            testReg.moveDown(testRegistryData()[0]);
        }
        catch {
            isSuccessful = true;
        }
    });
});
describe("moveDown is working", () => {
    test("entry moves down", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        testReg.moveDown(testRegistryData()[0]);
        if(testReg.getIndexOf(testRegistryData()[0]) === 1 && testReg.getIndexOf(testRegistryData()[1]) === 0) {
            isSuccessful = true;
        }
        assert(isSuccessful);
    });
    test("can't move last entry", () => {
        const testReg = new SongRegistry(testRegistryData());
        let isSuccessful = false;
        try {
            testReg.moveDown(testRegistryData()[testRegistryData.length-1]);
        }
        catch {
            isSuccessful = true
        }
        assert(isSuccessful);
    });
    test("can't move nonexistent entry", () => {
        const testReg = new SongRegistry([]);
        let isSuccessful = false;
        try {
            testReg.moveDown(testRegistryData()[0]);
        }
        catch {
            isSuccessful = true;
        }
    });
    test("getRegistry is working", () => {
        const testReg = new SongRegistry(testRegistryData());
        const isSuccessful = testReg.getRegistry().values === testRegistryData().values;
        assert(isSuccessful);
    });
    test.todo("cacheSongs is working");
});