import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import { mockListings, schools, roomTypes } from "@/lib/mockData";
import ListingCard from "@/components/ListingCard";
import { motion, AnimatePresence } from "framer-motion";

const Listings = () => {
  const [search, setSearch] = useState("");
  const [school, setSchool] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = [school !== "all", roomType !== "all", availableOnly, verifiedOnly, maxPrice !== "all"].filter(Boolean).length;

  const filtered = useMemo(() => {
    return mockListings.filter((l) => {
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.address.toLowerCase().includes(search.toLowerCase())) return false;
      if (school !== "all" && l.school !== school) return false;
      if (roomType !== "all" && l.roomType !== roomType) return false;
      if (availableOnly && !l.available) return false;
      if (verifiedOnly && !l.verified) return false;
      if (maxPrice !== "all" && l.price > Number(maxPrice)) return false;
      return true;
    });
  }, [search, school, roomType, availableOnly, verifiedOnly, maxPrice]);

  const clearFilters = () => {
    setSchool("all");
    setRoomType("all");
    setAvailableOnly(false);
    setVerifiedOnly(false);
    setMaxPrice("all");
  };

  return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-body mb-3">
              <MapPin className="w-4 h-4" /> Cagayan de Oro City
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Find Your Boarding House</h1>
            <p className="text-muted-foreground font-body">Browse verified rentals near your campus</p>
          </motion.div>

          {/* Search */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 font-body"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              className="h-12 gap-2 font-display relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold text-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="bg-card border border-border/60 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="font-display text-sm">School</Label>
                      <Select value={school} onValueChange={setSchool}>
                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Schools</SelectItem>
                          {schools.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-display text-sm">Room Type</Label>
                      <Select value={roomType} onValueChange={setRoomType}>
                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {roomTypes.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-display text-sm">Max Price</Label>
                      <Select value={maxPrice} onValueChange={setMaxPrice}>
                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Price</SelectItem>
                          <SelectItem value="2000">₱2,000</SelectItem>
                          <SelectItem value="3000">₱3,000</SelectItem>
                          <SelectItem value="4000">₱4,000</SelectItem>
                          <SelectItem value="5000">₱5,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center gap-2">
                        <Checkbox id="available" checked={availableOnly} onCheckedChange={(v) => setAvailableOnly(!!v)} />
                        <Label htmlFor="available" className="font-body text-sm cursor-pointer">Available only</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="verified" checked={verifiedOnly} onCheckedChange={(v) => setVerifiedOnly(!!v)} />
                        <Label htmlFor="verified" className="font-body text-sm cursor-pointer">Verified only</Label>
                      </div>
                    </div>
                  </div>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" className="text-muted-foreground font-body gap-1" onClick={clearFilters}>
                      <X className="w-3 h-3" /> Clear all filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground font-body">
              <span className="font-display font-semibold text-foreground">{filtered.length}</span> listing{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">No listings found</h3>
              <p className="text-muted-foreground font-body mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" className="font-display" onClick={clearFilters}>Clear Filters</Button>
            </motion.div>
          )}
        </div>
      </div>
  );
};

export default Listings;
